# Teachers


## GET /teachers/

####  List all registered Teachers

*body is not required for this request*

*token authorization is not required for this request*

**Output**

```JSON
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

```JSON
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


## POST /teachers/

#### Create a new Teacher

*body is required for this request* **Body Example:**
```JSON
{
    "name": "Cláudio",
    "email": "proftop@email.com",
    "password": "1234",
    "subject": "Matemática",
    "bio": "Eu gosto muito de ensinar"
}
```

*token authorization is not required for this request*

- Teacher with the same email is not allowed.

**Output**

```JSON
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


## POST /teachers/login

#### Login as a Teacher.

*body is required for this request* **Body Example:**
```JSON
{
	"email": "proftop@email.com",
	"password": "1234"
}
```

*token authorization is not required for this request*

- Generated token expires in one day

**Output**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Z0b3BAZW1haWwuY29tIiwiaWF0IjoxNjYzMTkxOTcxLCJleHAiOjE2NjMyNzgzNzEsInN1YiI6ImFlMzJkNzhjLTgxNTMtNDFlZi1hZTAxLTZmYTdmODk4NTQwNSJ9.bWgk6nznX72eEv-N6b3h5JPVkrPoMwiLahwo0HJd3dY"
}

```


## POST /teachers/:idClass

#### Add a student in a teacher class

*body is required for this request* **Body Example:**
```JSON
{
    "email": "aluno2@email.com"
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Is not be able to add same student in a same class
- Is not be able to add inexistent student in a class

**Output**

```JSON
[
	{
		"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
		"name": "Celio",
		"email": "aluno2@email.com",
		"createdAt": "2022-09-14T21:51:53.695Z",
		"updatedAt": "2022-09-14T21:51:53.695Z",
		"age": 12,
		"isActive": true
	}
]

```


# PATCH /teachers/:idTeacher

#### Update a teacher

*body is required for this request* **Body Example:**
```JSON
{
    "name": "CláudioEDITADOO",
    "subject": "Matemática",
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Is not be able to update a different Teacher

**Output**

```JSON
{
	"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
	"name": "CláudioEDITADOO",
	"email": "proftop@email.com",
	"subject": "Matemática",
	"bio": "Eu gosto muito de ensinar",
	"createdAt": "2022-09-14T21:18:13.581Z",
	"updatedAt": "2022-09-14T21:56:21.515Z",
	"isActive": true
}

```


# DELETE /teachers/:idTeacher

#### Delete a Teacher

*body is not required for this request*

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Is not be able to other teachers delete others

**Output**

```HTML
no body response for this request
```


# Guardians 

# GET /guardians/

####  List all registered Guardians

*body is not required for this request*

*token authorization is not required for this request*

**Output**

```JSON
[
	{
		"id": "faeafbb9-0700-4938-aa0b-994e2526c49a",
		"name": "Ronaldy",
		"email": "ronaldy@email.com",
		"cellNumber": "991997765"
	}
]
```


# GET /guardians/:idGuardian

####  List one Guardian information by his ID.

*body is not required for this request*

*token authorization is required for this request*
**Auth Example:**

```
'Bearer {token}'
```

- Is not be able to list a different Guardian

**Output**

```JSON
{
	"guardian": {
		"id": "faeafbb9-0700-4938-aa0b-994e2526c49a",
		"name": "Ronaldy",
		"email": "ronaldy@email.com",
		"cellNumber": "991997765"
	},
	"students": []
}
```


# POST /guardians/

#### Create a new Guardian

*body is required for this request* **Body Example:**
```JSON
{
	"name": "Ronaldy",
	"email": "ronaldy@email.com",
	"password": "1234",
	"cellNumber": "991997765"
}
```

*token authorization is not required for this request*

- Guardian with the same email is not allowed.

**Output**

```JSON
{
	"id": "faeafbb9-0700-4938-aa0b-994e2526c49a",
	"name": "Ronaldy",
	"email": "ronaldy@email.com",
	"cellNumber": "991997765"
}

```


# POST /guardians/students

#### Create a new student 

*body is required for this request* **Body Example:**
```JSON
{
	"name": "Celio",
	"email": "aluno2@email.com",
	"password": "1234",
	"age": 12
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Created student is assigned to the guardian who created it
- Is not be able to create a student with the same email that other students

**Output**

```JSON
{
	"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
	"name": "Celio",
	"email": "aluno2@email.com",
	"age": 12,
	"guardian": {
		"id": "faeafbb9-0700-4938-aa0b-994e2526c49a",
		"name": "Ronaldy",
		"email": "ronaldy@email.com",
		"cellNumber": "991997765"
	},
	"createdAt": "2022-09-14T21:51:53.695Z",
	"updatedAt": "2022-09-14T21:51:53.695Z",
	"isActive": true
}

```


# POST /guardians/login

#### Login as a Guardian.

*body is required for this request* **Body Example:**
```JSON
{
  "email": "ronaldy@email.com",
  "password": "1234"
}
```

*token authorization is not required for this request*

- Generated token expires in one day

**Output**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Z0b3BAZW1haWwuY29tIiwiaWF0IjoxNjYzMTkxOTcxLCJleHAiOjE2NjMyNzgzNzEsInN1YiI6ImFlMzJkNzhjLTgxNTMtNDFlZi1hZTAxLTZmYTdmODk4NTQwNSJ9.bWgk6nznX72eEv-N6b3h5JPVkrPoMwiLahwo0HJd3dY"
}

```


# PATCH /guardians/:idGuardian

#### Update a Guardian

*body is required for this request* **Body Example:**
```JSON
{
	"name": "RonaldyEDITADMIDDD",
	"email": "ronaldao@email.com",
	"cellNumber": "991997765"
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Is not be able to update a different Guardian

**Output**

```JSON
{
	"id": "faeafbb9-0700-4938-aa0b-994e2526c49a",
	"name": "RonaldyEDITADMIDDD",
	"email": "ronaldao@email.com",
	"cellNumber": "991997765"
}

```


# DELETE /guardians/:idGuardian

#### Delete a Guardian

*body is not required for this request*

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Is not be able to other guardians delete others

**Output**

```HTML
no body response for this request
```

# Classes

# GET /classes/

####  List all Classes created

*body is not required for this request*

*token authorization is required for this request*
**Auth Example:**

```
'Bearer {token}'
```

- Everybody with token can do a request

**Output**

```
[
	{
		"id": "b6141699-e290-46ef-aad3-cb04efbace54",
		"name": "Matemática Divertida",
		"hour": "09:30",
		"isOpen": true,
		"teacher": {
			"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
			"name": "CláudioEDITADOO",
			"email": "proftop@email.com",
			"subject": "Matemática",
			"bio": "Eu gosto muito de ensinar",
			"createdAt": "2022-09-14T21:18:13.581Z",
			"updatedAt": "2022-09-14T21:56:21.515Z",
			"isActive": true
		},
		"students": [
			{
				"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
				"name": "Celio",
				"email": "aluno2@email.com",
				"createdAt": "2022-09-14T21:51:53.695Z",
				"updatedAt": "2022-09-14T21:51:53.695Z",
				"age": 12,
				"isActive": true
			}
		]
	}
]
```


# GET /classes/:idClass

####  List one Class information by his ID.

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
	"id": "b6141699-e290-46ef-aad3-cb04efbace54",
	"name": "Matemática Divertida",
	"hour": "09:30",
	"isOpen": true,
	"teacher": {
		"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
		"name": "CláudioEDITADOO",
		"email": "proftop@email.com",
		"subject": "Matemática",
		"bio": "Eu gosto muito de ensinar",
		"createdAt": "2022-09-14T21:18:13.581Z",
		"updatedAt": "2022-09-14T21:56:21.515Z",
		"isActive": true
	},
	"students": [
		{
			"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
			"name": "Celio",
			"email": "aluno2@email.com",
			"createdAt": "2022-09-14T21:51:53.695Z",
			"updatedAt": "2022-09-14T21:51:53.695Z",
			"age": 12,
			"isActive": true
		}
	]
}
```


# POST /classes/

#### Create a new class

*body is required for this request* **Body Example:**
```JSON
{
  "name": "Matemática Divertida",
  "hour": "09:30"
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Only a Teacher can create a class

**Output**

```JSON
{
	"id": "b6141699-e290-46ef-aad3-cb04efbace54",
	"name": "Matemática Divertida",
	"hour": "09:30",
	"teacher": {
		"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
		"name": "Cláudio",
		"email": "proftop@email.com",
		"subject": "Matemática",
		"bio": "Eu gosto muito de ensinar",
		"createdAt": "2022-09-14T21:18:13.581Z",
		"updatedAt": "2022-09-14T21:18:13.581Z",
		"isActive": true
	},
	"students": [],
	"isOpen": true
}

```


# PATCH /classes/:idClass

#### Update a Class

*body is required for this request* **Body Example:**
```JSON
{
  "name": "Matemática DivertidaEDITADO",
  "hour": "09:30"
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Only classes's teacher can update the class

**Output**

```JSON
{
	"id": "b6141699-e290-46ef-aad3-cb04efbace54",
	"name": "Matemática DivertidaEDITADO",
	"hour": "09:30",
	"isOpen": true,
	"teacher": {
		"id": "ae32d78c-8153-41ef-ae01-6fa7f8985405",
		"name": "Cláudio",
		"email": "proftop@email.com",
		"subject": "Matemática",
		"bio": "Eu gosto muito de ensinar",
		"createdAt": "2022-09-14T21:18:13.581Z",
		"updatedAt": "2022-09-14T21:56:21.515Z",
		"isActive": true
	},
	"students": [
		{
			"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
			"name": "Celio",
			"email": "aluno2@email.com",
			"createdAt": "2022-09-14T21:51:53.695Z",
			"updatedAt": "2022-09-14T21:51:53.695Z",
			"age": 12,
			"isActive": true
		}
	]
}

```


# DELETE /classes/:idClass

#### Delete a Class

*body is not required for this request*

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Only class's teacher can delete his class

**Output**

```HTML
no body response for this request
```

# Students

# GET /students/

####  List all registered Students

*body is not required for this request*

*token authorization is not required for this request*

**Output**

```JSON
[
	{
		"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
		"name": "Celio",
		"email": "aluno2@email.com",
		"createdAt": "2022-09-14T21:51:53.695Z",
		"updatedAt": "2022-09-14T21:51:53.695Z",
		"age": 12,
		"isActive": true
	}
]
```


# GET /students/me

####  List logged Student

*body is not required for this request*

*token authorization is not required for this request*

**Output**

```JSON
{
	"students": {
		"id": "048442cd-73a6-4633-992f-b599a0fe4c61",
		"name": "Celio",
		"email": "aluno2@email.com",
		"createdAt": "2022-09-14T21:51:53.695Z",
		"updatedAt": "2022-09-14T21:51:53.695Z",
		"age": 12,
		"isActive": true
	},
	"studentClass": []
}
```


# POST /students/login

#### Login as a Student.

*body is required for this request* **Body Example:**
```JSON
{
	"email":"aluno2@email.com",
	"password": "1234"
}
```

*token authorization is not required for this request*

- Generated token expires in one day

**Output**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Z0b3BAZW1haWwuY29tIiwiaWF0IjoxNjYzMTkxOTcxLCJleHAiOjE2NjMyNzgzNzEsInN1YiI6ImFlMzJkNzhjLTgxNTMtNDFlZi1hZTAxLTZmYTdmODk4NTQwNSJ9.bWgk6nznX72eEv-N6b3h5JPVkrPoMwiLahwo0HJd3dY"
}

```


# PATCH /students/:idStudent

#### Update a Student

*body is required for this request* **Body Example:**
```JSON
{
	"name": "CelioEDITADO",
  "password": "1234",
  "age": 15
}
```

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Only student's guardian can update his student

**Output**

```JSON
{
	"id": "a0175f2f-6f98-4448-a64c-e3fd0caad364",
	"name": "CelioEDITADO",
	"email": "aluno3@email.com",
	"createdAt": "2022-09-14T22:49:29.435Z",
	"updatedAt": "2022-09-14T22:50:12.842Z",
	"age": 15,
	"isActive": true
}
```


# DELETE /students/:idStudent

#### Delete a Student

*body is not required for this request*

*token authorization is required for this request* **Auth Example:**

```
'Bearer {token}'
```

- Only student's guardian can delete his student

**Output**

```HTML
no body response for this request
```
