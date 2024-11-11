import hashlib
import pandas as pd

class Block:
    def __init__(self, block_id, tokens, previous_hash, nonce, total_hash, additional_token, verification_hash):
        self.block_id = block_id
        self.tokens = tokens
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.total_hash = total_hash
        self.additional_token = additional_token
        self.verification_hash = verification_hash

    def calculate_hash(self):
        block_contents = str(self.block_id) + str(self.tokens) + str(self.previous_hash) + str(self.nonce)
        return hashlib.sha256(block_contents.encode()).hexdigest()

    def calculate_verification_hash(self):
        return hashlib.sha256((self.total_hash + self.additional_token).encode()).hexdigest()

    def mine_block(self, difficulty):
        while self.total_hash[:difficulty] != '0' * difficulty:
            self.nonce += 1
            self.total_hash = self.calculate_hash()

    def validate_block(self):
        if self.total_hash != self.calculate_hash() or self.verification_hash != self.calculate_verification_hash():
            return False
        return True

    def __str__(self):
        return f"BlockID: {self.block_id}\nTokens: {self.tokens}\nPrevious Hash: {self.previous_hash}\nNonce: {self.nonce}\nTotal Hash: {self.total_hash}\nVerification Hash: {self.verification_hash}"

class Blockchain:
    def __init__(self):
        self.chain = []
        self.difficulty = 4  # Number of zeroes for hash mining 
        self.current_block_id = 1
        self.load_from_excel()

    def load_from_excel(self):
        try:
            df = pd.read_excel('blockchain_data.xlsx')
            for index, row in df.iterrows():
                block = Block(row['BlockID'], row['Tokens'], row['Previous Hash'], row['Nonce'], row['Total Hash'], row['Additional Token'], row['Verification Hash'])
                if not block.validate_block():
                    print(f"Block {block.block_id} data has been tampered with.")
                    return
                self.chain.append(block)
                self.current_block_id += 1
        except FileNotFoundError:
            print("Blockchain data file not found. Starting with an empty chain.")

    def add_block(self, tokens):
        previous_hash = "0" if len(self.chain) == 0 else self.chain[-1].total_hash
        new_block = Block(self.current_block_id, tokens, previous_hash, 0, '', '', '')
        new_block.mine_block(self.difficulty)
        new_block.additional_token = input("Enter additional token: ")
        new_block.verification_hash = new_block.calculate_verification_hash()
        if not new_block.validate_block():
            print("Block data has been tampered with. Adding block aborted.")
            return
        self.chain.append(new_block)
        self.current_block_id += 1
        print(f"Block added successfully.\nVerification Hash: {new_block.verification_hash}")

    def validate_block(self, verification_hash):
        for block in self.chain:
            if block.verification_hash == verification_hash:
                if not block.validate_block():
                    print(f"Block {block.block_id} data has been tampered with.")
                    return None
                return block
        return None

    def save_to_excel(self):
        data = {'BlockID': [], 'Tokens': [], 'Previous Hash': [], 'Nonce': [], 'Total Hash': [], 'Additional Token': [], 'Verification Hash': []}
        for block in self.chain:
            data['BlockID'].append(block.block_id)
            data['Tokens'].append(block.tokens)
            data['Previous Hash'].append(block.previous_hash)
            data['Nonce'].append(block.nonce)
            data['Total Hash'].append(block.total_hash)
            data['Additional Token'].append(block.additional_token)
            data['Verification Hash'].append(block.verification_hash)
        df = pd.DataFrame(data)
        df.to_excel('blockchain_data.xlsx', index=False)


def create_blockchain_menu():
    blockchain = Blockchain()

    while True:
        print("\nMenu:")
        print("1. Create Block")
        print("2. Validate Block")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            name = input("Enter name: ")
            position = input("Enter position: ")
            guests = input("Enter guests: ")
            institution = input("Enter institution: ")
            tokens = {'name': name, 'position': position, 'guests': guests, 'institution': institution}
            blockchain.add_block(tokens)
            blockchain.save_to_excel()

        elif choice == '2':
            verification_hash = input("Enter Verification Hash to validate: ")
            block = blockchain.validate_block(verification_hash)
            if block:
                print("Block is valid. Details:")
                print(block)
            else:
                print("Block not found or verification hash is invalid.")

        elif choice == '3':
            print("Exiting program.")
            break

        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    create_blockchain_menu()
