# NurserySystem
Welcome to the Nursery Management System! This system allows the management of teachers, children, and administrator in nursery


<h2>- Installation and Setup</h2><br>

**1- Clone the repository:** <br>
git clone https://github.com/yourusername/nurserySystem.git <br><br>

**2- Install dependencies:** <br>
cd nursery-management-system <br>
npm install 
<br><br>
**3- Create a .env file and add the following variables:** 
SECRET_KEY=your_secret_key <br>
DB_URL=your_mongodb_connection_string <br>
PORT=3000 <br>


<h2>Usage</h2>

**- Teachers:** <br>
- Teachers can register by providing their details and uploading a profile picture.
- After registration, teachers can log in and access their account details.
- Teachers have access to the following functionalities:<br>
1- View All Teachers: Access details of all teachers in the system.<br>
2- View Other Children Details: Access details of children enrolled in classes.<br>
3- View Classes Details: Access details of classes, including supervisors and enrolled children.<br>
4- Update Profile: Update their profile information, including profile picture.<br>
5- Change Password: Change their password using the provided endpoint.<br>
6- View Class Children and Class Supervisor Info: Access information about the children and supervisor of their assigned classes.<br>
7- View All Class Supervisors: Access details of all class supervisors using the provided endpoints.<br>

**- Administrator:** <br>
- The administrator has a static username and password.
- After logging in, the administrator can perform the following actions:<br>
1- View Children Details: Access details of all children in the system.<br>
2- Add Child: Add a new child to the system.<br>
3- Update Child: Update details of existing children.<br>
4- Delete Child: Delete children from the system.<br>
5- View Classes Details: Access details of all classes, including supervisors and enrolled children.<br>
6- Add Class: Add a new class to the system.<br>
7- Update Class: Update details of existing classes.<br>
8- Delete Class: Delete classes from the system.<br>
9- View Teachers Details: Access details of all teachers in the system.<br>
10- Delete Teacher: Delete teachers from the system.<br>
11- View Class Children and Class Supervisor Info: Access information about the children and supervisor of all classes.<br>
12- View All Class Supervisors: Access details of all class supervisors using the provided endpoints.<br>



<h2>Swagger Documentation</h2> <br>
Access the Swagger documentation for all endpoints by visiting the `/swagger` endpoint after starting the server.<br><br>


