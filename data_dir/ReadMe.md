## Загрузка

Файлы в архиве необходимо разместить в data-папке Geoserver любым доступным способом. После размещения запустить/перезапустить Geoserver.

### [!Важно!]
Для работы WFS сервиса и выгрузки данных в формате JSON с GeoServer без возникновения CORS ошибок, необходимо расскоментировать строки в файле web.xml (пример для Jetty). После внесения изменений необходимо перезагрузить GeoServer, если он был запущен

```
...
    <!--Can be true or false (defaults to: false). -->
    <!--When true the JSONP (text/javascript) output format is enabled -->
    
    <context-param>
      <param-name>ENABLE_JSONP</param-name>
      <param-value>true</param-value>
    </context-param>

...

  <!-- Uncomment following filter to enable CORS in Jetty. Do not forget the second config block further down. -->
        
	
    <filter>
       <filter-name>cross-origin</filter-name>
       <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
       <init-param>
         <param-name>chainPreflight</param-name>
         <param-value>false</param-value>
       </init-param>
       <init-param>
         <param-name>allowedOrigins</param-name>
         <param-value>*</param-value>
       </init-param>
       <init-param>
         <param-name>allowedMethods</param-name>
         <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
       </init-param>
       <init-param>
         <param-name>allowedHeaders</param-name>
         <param-value>*</param-value>
       </init-param>
     </filter>

...

    <!-- Uncomment following filter-mapping to enable CORS -->
    
    <filter-mapping>
        <filter-name>cross-origin</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
...
```
