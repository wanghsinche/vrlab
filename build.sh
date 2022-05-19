#sudo docker build -t qingong:last .
sudo docker run \
--env PORT=80 \
--env URL=http://106.55.166.168/api \
-p 8080:80 \
-v /home/ubuntu/data:/app/backend/data \
wanghsinche/vrlab:73b2742a1fa702f2d3593327a08237b935757ad7 
