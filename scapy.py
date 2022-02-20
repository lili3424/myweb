from scapy.all import *
import time

with PcapReader('eth0.cap') as pcap_reader:
    list_filed = []
    for pkt in pcap_reader:
        ticks = int(time.time())
        if pkt['Ether'].src == "38:f9:d3:98:aa:95" or pkt['Ether'].dst == "38:f9:d3:98:aa:95":
            list_filed.append(int (pkt.time))
        a = list_filed[-1] - list_filed[0]
        time_local = time.localtime(ticks)
        dt = time.strftime("%Y-%m-%d %H:%M:%S",time_local)
    print (a,"s")
    print (dt)

     

        

        
        