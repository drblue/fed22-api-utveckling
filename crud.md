# CRUD

C = **C**reate

R = **R**ead

U = **U**pdate

D = **D**elete

## Authors

| HTTP Verb | URI                | Action  | CRUD   |
|-----------|--------------------|---------|--------|
| GET       | /authors           | index   | Read   |
| GET       | /authors/:authorId | show    | Read   |
| POST      | /authors           | store   | Create |
| PATCH     | /authors/:authorId | update  | Update |
| DELETE    | /authors/:authorId | destroy | Delete |

## Books

| HTTP Verb | URI                | Action  | CRUD   |
|-----------|--------------------|---------|--------|
| GET       | /books             | index   | Read   |
| GET       | /books/:bookId     | show    | Read   |
| POST      | /books             | store   | Create |
| PATCH     | /books/:bookId     | update  | Update |
| DELETE    | /books/:bookId     | destroy | Delete |

## Publishers

| HTTP Verb | URI                      | Action  | CRUD   |
|-----------|--------------------------|---------|--------|
| GET       | /publishers              | index   | Read   |
| GET       | /publishers/:publisherId | show    | Read   |
| POST      | /publishers              | store   | Create |
| PATCH     | /publishers/:publisherId | update  | Update |
| DELETE    | /publishers/:publisherId | destroy | Delete |
