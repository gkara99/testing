
FROM python:3-alpine

WORKDIR /app/src

RUN pip install requests

COPY ["deployment_scenarios/imu_testing/python/src", "./"]

RUN addgroup -S iotProjectGroup

RUN adduser -S iotProjectUser -G iotProjectGroup

USER iotProjectUser

CMD ["python", "interpret_imu_data.py"]
