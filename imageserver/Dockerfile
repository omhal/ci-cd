FROM ubuntu:18.04 as build

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y dist-upgrade
RUN apt-get -y autoremove
RUN apt-get -y update
RUN apt-get -y install nodejs npm git
RUN npm install pm2 -g

WORKDIR /root
COPY . src/

WORKDIR /root/imageserver
RUN cp -R /root/src/*.js* /root/src/helpers . && \
	mkdir -p /root/imageserver/publics && \
	mkdir -p /root/imageserver/publics/images && \
	mkdir -p /root/imageserver/publics/images/recognize && \
	mkdir -p /root/imageserver/publics/images/unrecognize && \
	mkdir -p /root/imageserver/publics/images/people
RUN npm install
CMD	pm2-runtime app.js