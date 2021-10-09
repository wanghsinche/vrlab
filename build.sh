#sudo docker build -t qingong:last .
sudo docker run \
--env PORT=80 \
--env URL=http://106.55.166.168/api \
-p 80:80 \
-v /home/ubuntu/data:/app/backend/data \
qingong:last 
