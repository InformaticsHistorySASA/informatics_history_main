import json

# JSON 파일 읽기
with open("output.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# 데이터 출력
print(data)
