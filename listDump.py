# -*- coding:utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
import os

CUR_DIR = os.getcwd()
dump = os.path.join(CUR_DIR, "res")
# 遍历这个文件夹包括子文件夹 列出所有文件
# print CUR_DIR
lists = os.walk(dump);

print "var jsListDump = ["
# 遍历目录
for root, dirs, files in lists:
    for file in files:
        # 分离文件名与扩展名
        full_path = os.path.join(root, file)
        leave_name = full_path.split("429304451.github.io\\")[1].replace("\\", "/")
        print "\t\"" + leave_name + "\","

print "];"
