import requests

url = ("https://api.opendota.com/api/constants/hero_abilities")

response = requests.get(url)

data = response.json()
hero_name = "antimage"
print(data[f"npc_dota_hero_{hero_name}"]["facets"])
print(len(data[f"npc_dota_hero_{hero_name}"]["facets"]))
print(len(data))
