import requests
import json
from datetime import date as dt
import datetime
import os
import urllib.request
import re
import markdown
from bs4 import BeautifulSoup

def to_update():
    url = "https://api.github.com/orgs/BlossomTheme/repos?type=all&sort=created&direction=desc&per_page=100"
    resp = requests.get(url)
    data = resp.json()
    to_be_updated = []
    init_date = dt(2024, 7, 22)
    
    with open("./builder.conf", "r")as file:
        for line in file:
            if "#" not in line:
                init_date = dt.fromisoformat(line)
            else:
                continue

    for entry in data:
        date_created = dt.fromisoformat(entry["created_at"].split("T")[0])
        if date_created >= init_date:
            to_be_updated.append(entry["name"])

    print("Fetching to be updated list")
    return to_be_updated


def create_project_page(name, description, image_locations, installation_instructions):
    img_pattern = r'(<div id="images-go-here">\s*)(</div>)'
    replacement = ""
    installation_instructions = markdown.markdown(installation_instructions)

    os.system(f"cp ./pages/SAMPLE.html ./pages/{name.lower()}.html")

    with open(rf'./pages/{name.lower()}.html', 'r') as file: 
        ## Add Title, Description & Installation
        data = file.read() 
        data = data.replace("-TITLE-", name)
        data = data.replace("-DESCRIPTION-", description)
        data = data.replace("-INSTALLATION-", installation_instructions)

        ## Add images
        for image in image_locations:
            img_tags = f"<img src=\"https://raw.githubusercontent.com/BlossomTheme/{name}/main/{image}\" width=\"75%\">"
            replacement = replacement + r'\1' + img_tags + r'\2' + '\n'

        data = re.sub(img_pattern, replacement, data)

    ## Finalize file
    with open(rf'./pages/{name.lower()}.html', 'w') as file:     
        file.write(data) 

    print(f"Created project page for {name}")


def get_theme_info(name):
    url = f"https://api.github.com/repos/BlossomTheme/{name}"
    images = []
    pattern = r'!\[\]\((.*?)\)'
    extracted_image_paths = []
    read_me_file = urllib.request.urlopen(f"https://raw.githubusercontent.com/BlossomTheme/{name}/main/README.md") ## Gets the content of README at BlossomTheme/Repo @Github
    installation_instructions = ""
    installation_header_found = False

    resp = requests.get(url)
    data = resp.json()

    description = data["description"]

    for line in read_me_file:
        if "![]" in line.decode('utf-8'):
            images.append(line.decode('utf-8').replace("\n", ""))
        
        elif "## Installation" in line.decode('utf-8'):
            installation_header_found = True
            continue

        elif installation_header_found:
            installation_instructions = installation_instructions + (line.decode('utf-8')).strip() + '\n'

        else:
            continue
    
    for item in images:
        match = re.search(pattern, item)
        if match:
            path = match.group(1)
            if path.startswith('./'):
                path = path[2:]  # Remove './' from the beginning
            extracted_image_paths.append(f"{path}")

    print(f"Fetched details for {name}")
    return description, extracted_image_paths, installation_instructions


def add_project_page_entry(image, name):           
    # Read the HTML file
    with open("./pages/projects.html", 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    # Find the container div
    container = soup.find('div', class_='row tm-mb-90 tm-gallery')

    if container:
        # Find the last div in the container
        last_div = container.find_all('div', class_='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5')[-1]

        # Create and insert new divs
        new_div = BeautifulSoup(f'''
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
            <figure class="tm-video-item">
                <img src={image} alt="Image" class="img-fluid">
                <figcaption class="d-flex align-items-center justify-content-center">
                    <a href="./{name.lower()}.html">View more</a>
                </figcaption>                    
            </figure>
            <div class="d-flex justify-content-between tm-text-gray">
                <span>{name}</span>
            </div>
        </div>
        ''', 'html.parser')
        last_div.insert_after(new_div)
        last_div = new_div

    # Write the modified HTML back to the file
    with open("./pages/projects.html", 'w', encoding='utf-8') as file:
        file.write(str(soup))

    print(f"Project Page entry for {name} created")


def update_config():
    with open("./builder.conf", "w") as file:
        file.write(f"# Last updated\n{datetime.datetime.now().strftime('%Y-%m-%d')}")
        file.close

    print("builder.conf updated")


def main():
    list_to_update = to_update()
    # list_to_update = ["Ghidra"] ## generate single theme(manual run)

    if list_to_update:
        for addition in list_to_update:
            info = get_theme_info(addition)
            create_project_page(addition, info[0], info[1], info[2])
            print(f"Created page for {addition}")

            if info[1]:
                image = f"https://raw.githubusercontent.com/BlossomTheme/{addition}/main/{info[1][0]}"
                add_project_page_entry(image, addition)
            else:
                print(f"No images found for {addition}")

            print(f"Successfully added {addition} to web..........\n\n")
    else:
        print("Nothing found to be updated")

    # updates the config with the site updated date
    update_config()


if __name__ == "__main__":
    main()
