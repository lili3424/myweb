import pymysql
import json
conn = pymysql.connect(host='localhost', user='root', password='366366', db='sumaho', charset="utf8")
cursor = conn.cursor()
sql = "insert into user_info values(1,123,222,80,3)"
cursor.execute(sql)
conn.commit()
cursor.close()
conn.close()