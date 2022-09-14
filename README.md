# Teachers

## List Teachers

## GET /teachers/

####  List all registered Teachers

*body is not required for this request*

*token authorization is not required for this request*

**Output**

```
[
	{
		"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
		"name": "Cláudio",
		"email": "proftop@email.com",
		"subject": "Matemática",
		"bio": "Eu gosto muito de ensinar",
		"createdAt": "2022-09-14T21:18:13.581Z",
		"updatedAt": "2022-09-14T21:18:13.581Z",
		"isActive": true
	}
]

```

# List Teacher

## GET /teachers/:idTeacher

####  List one Teacher information by his ID.

*body is not required for this request*

*token authorization is required for this request*
**Auth Example:**

```
'Bearer {token}'
```

- Everybody with token can do a request

**Output**

```
	{
		"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
		"name": "Cláudio",
		"email": "proftop@email.com",
		"subject": "Matemática",
		"bio": "Eu gosto muito de ensinar",
		"createdAt": "2022-09-14T21:18:13.581Z",
		"updatedAt": "2022-09-14T21:18:13.581Z",
		"isActive": true
	}
```
