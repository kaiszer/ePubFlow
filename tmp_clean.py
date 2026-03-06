import subprocess

def clear_tmp_directory():
    command = 'rm -rf /tmp/* /tmp/.*'
    try:
        subprocess.run(command, shell=True, check=True)
        print("Temporary directory cleared successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    clear_tmp_directory()
