import threading
import scapy.all as scpy
import datetime
from logging import getLogger, basicConfig, NullHandler,DEBUG, INFO, WARNING
mylogger = getLogger(__name__)
mylogger.addHandler(NullHandler())

class Sniffer(threading.Thread):
    def __init__(self, iface, count=20, timeout=3, logger=None):
        self.stop_event = threading.Event() #停止させるかのフラグ
        self.thread = threading.Thread(target = self._sniffer_main_loop)
        self.iface = iface
        self.count = count
        self.timeout = timeout
        self.packets = None
        if logger:
            self.log = logger
        else:
            self.log = mylogger

    def start(self):
        self.log.debug(f"try to start thread.")
        self.packets = None
        self.stop_event.clear()
        self.thread.start()

    def stop(self):
        self.log.debug(f"try to stop thread.")
        self.stop_event.set()
        self.thread.join()

    def _sniffer_main_loop(self):
        self.log.debug(f"start thread.")

        try:
            while not self.stop_event.is_set():
                pkts = scpy.sniff(filter="ip src 192.168.3.3" , iface="eth0",  timeout=2, prn=lambda x:x.summary())
                if self.packets:
                    self.packets += pkts
                else:
                    self.packets = pkts
        except Exception as e:
            self.log.error(f"exception occurred. stop sniffer main loop. {e}")
            self.stop_event.set()

        self.log.debug(f"end thread.")

    def create_pcap(self, fname=datetime.datetime.now().strftime("doip_test_%H%M%S.cap")):
        self.stop() if not self.stop_event.is_set() else None
        scpy.wrpcap(fname, self.packets)