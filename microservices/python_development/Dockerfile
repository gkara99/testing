
FROM python:3-alpine

WORKDIR /app/src

RUN pip install requests

RUN addgroup -S iotProjectGroup

RUN adduser -S iotProjectUser -G iotProjectGroup

USER iotProjectUser

CMD ["tail", "-f", "/dev/null"]
