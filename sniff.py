import threading
import scapy.all as scpy
import datetime
from logging import getLogger, basicConfig, NullHandler,DEBUG, INFO, WARNING


pkts = scpy.sniff(filter="ip src 192.168.3.3" , iface="eth0",  timeout=10, prn=lambda x:x.summary())
print (pkts)