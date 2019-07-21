# mini-wp

### Deploy Link
https://miniwp.fildabert.com/#/


## User Schema
| Key | Type | Description |
| --- | ---- | ----------- |
|username|String|user's username|
| email | String | user's email |
| password | String | user's password |

#### Register User

```
POST
http://localhost:3000/api/users/register
Body:
{
    username: filbert1,
    email: filbert1@mail.com
    password: filbert1
}
```

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTYyNiwiZXhwIjoxNTYzNzU3MjI2fQ.bSrSYG5EzlN8yRU9rMgz8TV_cAFReRp7way2IyAHZV8",
    "username": "filbert1"
}
```

#### Login User

```
POST
http://localhost:3000/api/users/login
Body:
{
    username: "filbert1",
    password: "filbert1"
}
```

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw",
    "username": "filbert1"
}
```


## Article Schema
| Key | Type | Description |
| --- | ---- | ----------- |
| title | String | Article's title |
| author | ObjectId | Article's author |
| content | String | Article's content |
| image | String | Article's image url |
| tags | Array | Article's tags |

#### Get All Articles
```
GET
http://localhost:3000/api/articles/all
```

```
[
    {
        "tags": [
            "MOFO",
            "GUNS",
            "TAGZ"
        ],
        "_id": "5d3490fc8cd4c30ed48c70f9",
        "title": "testing tagz",
        "content": "<p>tcygvuhbijnkm</p>",
        "image": "https://storage.googleapis.com/mini-wp-bucket-filbert/1563726062845the_starry_night-wallpaper-1920x1080.jpg",
        "author": {
            "_id": "5d2ee7cc2c23ea23f6952467",
            "username": "Filbert Filbert",
            "email": "filberttttt@gmail.com",
            "password": "$2b$10$fo1gGjNqBF/7eyYwbLgf5ukk42oOxv8bwk9CW1KGOKskmv4q5c3BC",
            "createdAt": "2019-07-17T09:18:04.707Z",
            "updatedAt": "2019-07-17T09:18:04.707Z",
            "__v": 0
        },
        "createdAt": "2019-07-21T16:21:16.864Z",
        "updatedAt": "2019-07-21T16:21:16.864Z",
        "__v": 0
    },
    {...Articles}
    ]
```

#### Get One Article
```
GET
http://localhost:3000/api/articles/viewArticle?id=
```

```
{
        "tags": [
            "MOFO",
            "GUNS",
            "TAGZ"
        ],
        "_id": "5d3490fc8cd4c30ed48c70f9",
        "title": "testing tagz",
        "content": "<p>tcygvuhbijnkm</p>",
        "image": "https://storage.googleapis.com/mini-wp-bucket-filbert/1563726062845the_starry_night-wallpaper-1920x1080.jpg",
        "author": {
            "_id": "5d2ee7cc2c23ea23f6952467",
            "username": "Filbert Filbert",
            "email": "filberttttt@gmail.com",
            "password": "$2b$10$fo1gGjNqBF/7eyYwbLgf5ukk42oOxv8bwk9CW1KGOKskmv4q5c3BC",
            "createdAt": "2019-07-17T09:18:04.707Z",
            "updatedAt": "2019-07-17T09:18:04.707Z",
            "__v": 0
        },
        "createdAt": "2019-07-21T16:21:16.864Z",
        "updatedAt": "2019-07-21T16:21:16.864Z",
        "__v": 0
    }
```

#### Get All Tags
```
GET
http://localhost:3000/api/articles/tags
```

```
[
    "ARTICLE",
    "ASD",
    "ASDTEST",
    "BICBOI",
    "GUNS",
    "IDUNNO",
    "JOHN",
    "JOHNCENA",
    "LOL",
    "MOFO",
    "OFF",
    "OHYEAH",
    "QBZ",
    "TAGZ",
    "TEST",
    "WHAT",
    "YES"
]
```

#### Get Articles By Tag

```
GET
http://localhost:3000/api/articles/tag?tag=ARTICLE
```

```
[
    {
        "tags": [
            "ARTICLE",
            "WHAT",
            "GUNS"
        ],
        "_id": "5d3436170aa6ae13c6dd29e0",
        "title": "ARTICLE 1234",
        "content": "<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of   of classical Latin literature from 45 BC, making it over 2000 years old. RichaContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richa</p>",
        "image": "https://storage.googleapis.com/mini-wp-bucket-filbert/1563702736214the_starry_night-wallpaper-1920x1080.jpg",
        "author": {
            "_id": "5d2ee7cc2c23ea23f6952467",
            "username": "Filbert Filbert",
            "email": "filberttttt@gmail.com",
            "password": "$2b$10$fo1gGjNqBF/7eyYwbLgf5ukk42oOxv8bwk9CW1KGOKskmv4q5c3BC",
            "createdAt": "2019-07-17T09:18:04.707Z",
            "updatedAt": "2019-07-17T09:18:04.707Z",
            "__v": 0
        },
        "createdAt": "2019-07-21T09:53:27.544Z",
        "updatedAt": "2019-07-21T16:04:52.145Z",
        "__v": 1
    },
    {...Articles}
]
```

#### Get Trending Tags
```
GET
http://localhost:3000/api/articles/trendingtags
```

```
[
    "GUNS",
    "OFF",
    "ARTICLES",
    "JOHNCENA",
    "OHYEAH",
    "ASDTEST",
    "IDUNNO"
]
```


#### Get My Articles
```
GET
http://localhost:3000/api/articles/myarticles
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
```

```
[
    {
        "tags": [
            "MOFO",
            "GUNS",
            "TAGZ"
        ],
        "_id": "5d3490fc8cd4c30ed48c70f9",
        "title": "testing tagz",
        "content": "<p>tcygvuhbijnkm</p>",
        "image": "https://storage.googleapis.com/mini-wp-bucket-filbert/1563726062845the_starry_night-wallpaper-1920x1080.jpg",
        "author": {
            "_id": "5d2ee7cc2c23ea23f6952467",
            "username": "Filbert Filbert",
            "email": "filberttttt@gmail.com",
            "password": "$2b$10$fo1gGjNqBF/7eyYwbLgf5ukk42oOxv8bwk9CW1KGOKskmv4q5c3BC",
            "createdAt": "2019-07-17T09:18:04.707Z",
            "updatedAt": "2019-07-17T09:18:04.707Z",
            "__v": 0
        },
        "createdAt": "2019-07-21T16:21:16.864Z",
        "updatedAt": "2019-07-21T16:21:16.864Z",
        "__v": 0
    },
    {...Articles}
```

#### Add Article
```
POST
http://localhost:3000/api/articles/addarticle
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
    {
        title: Article 1,
        content: Content,
        image: http://image,
        author: ObjectId,
        tags: [tag1, tag2, tag3]
    }
```

```
{
        "tags": [
            "MOFO",
            "GUNS",
            "TAGZ"
        ],
        "_id": "5d3490fc8cd4c30ed48c70f9",
        "title": "testing tagz",
        "content": "<p>tcygvuhbijnkm</p>",
        "image": "https://storage.googleapis.com/mini-wp-bucket-filbert/1563726062845the_starry_night-wallpaper-1920x1080.jpg",
        "author": {
            "_id": "5d2ee7cc2c23ea23f6952467",
            "username": "Filbert Filbert",
            "email": "filberttttt@gmail.com",
            "password": "$2b$10$fo1gGjNqBF/7eyYwbLgf5ukk42oOxv8bwk9CW1KGOKskmv4q5c3BC",
            "createdAt": "2019-07-17T09:18:04.707Z",
            "updatedAt": "2019-07-17T09:18:04.707Z",
            "__v": 0
        },
        "createdAt": "2019-07-21T16:21:16.864Z",
        "updatedAt": "2019-07-21T16:21:16.864Z",
        "__v": 0
    }
```

#### Edit Article

```
PUT
http://localhost:3000/api/articles/editarticle?id=ArticleId
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
    {
        title: Article 1,
        content: Content,
        image: http://image,
        author: ObjectId,
        tags: [tag1, tag2, tag3]
    }
```

```
{
        "tags": [
            "MOFO",
            "GUNS",
            "TAGZ"
        ],
        "_id": "5d3490fc8cd4c30ed48c70f9",
        "title": "testing tagz",
        "content": "<p>tcygvuhbijnkm</p>",
        "image": "https://storage.googleapis.com/mini-wp-bucket-filbert/1563726062845the_starry_night-wallpaper-1920x1080.jpg",
        "author": {
            "_id": "5d2ee7cc2c23ea23f6952467",
            "username": "Filbert Filbert",
            "email": "filberttttt@gmail.com",
            "password": "$2b$10$fo1gGjNqBF/7eyYwbLgf5ukk42oOxv8bwk9CW1KGOKskmv4q5c3BC",
            "createdAt": "2019-07-17T09:18:04.707Z",
            "updatedAt": "2019-07-17T09:18:04.707Z",
            "__v": 0
        },
        "createdAt": "2019-07-21T16:21:16.864Z",
        "updatedAt": "2019-07-21T16:21:16.864Z",
        "__v": 0
    }
```


#### Delete Article
```
DELETE
http://localhost:3000/api/articles/deletearticle?id=ArticleId
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
```

```
{deletedCount: 1}
```