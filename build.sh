#sudo docker build -t qingong:last .
sudo docker run \
--env PORT=80 \
--env URL=http://0.0.0.0/api \
-p 8080:80 \
-v /home/ubuntu/data:/app/backend/data \
#qingong:last
wanghsinche/vrlab:1c40a93c974247f40ea6b76d72cfb80510b1fa22

 
