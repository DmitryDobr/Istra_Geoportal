# Геопортал городского округа Истра

Учебный проект по разработке геопортала на выбранную территориальную единицу. Не имеет отношения к проектам, разрабатываемым при поддержке или по заказу администрации городского округа Истра.

![image](https://github.com/DmitryDobr/Istra_Geoportal/assets/63702962/f79f39bd-13af-4278-8835-c2b309cc92e8)


## Зависимости [Сервер]

Проект использует ПО Geoserver для хранения и загрузки геоданных. В папки ПО размещаются файлы из папки ./data_dir

- [Официальный сайт Geoserver](https://geoserver.org)

- [Репозиторий Geoserver](https://github.com/geoserver/geoserver)

## Зависимости [Приложение]

Конечный результат - рабочее веб-приложение, отображающее пространственную информацию, размещенную в Geoserver. Для визуализации слоев используется открытая JavaScript библиотека Open Layers. Веб-приложение написано на html+js с использованием инструмента сборки Vite.

- [Библиотека Open Layers](https://openlayers.org)

- [Vite](https://vitejs.dev)
