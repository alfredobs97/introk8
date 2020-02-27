# Introducción a K8´s

### Encaplusar nuestra app para utilizar en kubernetes
0. Crear cuenta en DockerHub
1. docker login --username=
2. generar .dockerignorer para indicar que no se va a copiar a la imagen
3. generate docker image from dockerfile: `docker build -t alfredobs97/minodejskubernetes:v1 .`
4. `docker push alfredobs97/minodejskubernetes:v1`

### Primeros pasos 
1. levantamos deploy
2. levantamos service
3. activar ingress controller `minikube addons enable ingress`
4. levantamos ingress para acceder desde la ip del cluster /nodejs

### Acceder a la terminal de algun pod
`kubectl exec -it nombrePod /bin/bash`

### Puentear pod para probar
`kubectl port-foward pod puertoHost:puertoPod`

**Si quieres puentearlo y que sea accesible desde la red pública puedes usar --address para seleccionar la interfaz**

`kubectl port-forward --address publicIP pod puertoHost:puertoPod`

### Despliegue de nueva versión de nuestra app
Podemos actualizar nuestra app de manera muy simple y **sin downtime** usando el siguiente comando

`kubectl set image deployments/deploy-nodejs nodejs=alfredobs97/minodejskubernetes:v1.2 --record=true`

Con la flag --record seleccionamos que se guarde en el registro el comando o lo que queramos

### La actualización ha ido mal, queremos volver a la versión anterior

`kubectl rollout undo deployment deploy-nodejs`

Queremos volver a cualquier **version anterior**

`kubectl rollout undo deployment deploy-nodejs --to-revision=3`

Para ver el historial utilizamos el comando

`kubectl rollout history deployment deploy-nodejs`

### Mi app está saturada, necesito mas máquinas
`kubectl scale deployment deploy-nodejs --replicas=5`

Ya, pero no quiero estar haciendolo a mano

`kubectl autoscale deployment deploy-nodejs --min=3 --max=5 --cpu-percent=70`

**En nuevas versiones (a partir de 1.6) se puede utilizar diferentes métricas para el autoescalado**

### Perfecto, todo es muy automático pero ¿cómo defino donde tiene que atacar mi app?
puedes utilizar el name de cada resource y el dns interno del cluster lo resolverá, por ejemplo usar dbmysql en el host de nuestra app

### Presentación:
Parte 1:

https://docs.google.com/presentation/d/1hATDUbYoIv-VVzplN5__sGo_aDnn2RtI7j8Bb-d4lgE/edit?usp=sharing

Parte 2: 

https://docs.google.com/presentation/d/12anWbvIMVbDN0Xfg_3DuCfwj8lyzUATmWKoN5aGNEs4/edit?usp=sharing
