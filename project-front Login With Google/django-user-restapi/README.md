# Install & Run

1. Install Poetry package manager
2. Execute command as below

- [poetry](https://python-poetry.org/docs/#installation)

```shell
# Change directory path to project location

poetry install
poetry shell
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
> And open browser to browse http://loaclhost:8000/swagger
