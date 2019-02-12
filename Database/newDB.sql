DROP DATABASE IF EXISTS trainer_dee
;
CREATE DATABASE trainer_dee ;

use trainer_dee
;

CREATE TABLE Client
(
    clientID varchar(13) not null,
    fName varchar
    (20) NOT NULL,
    lName varchar
    (20) NOT NULL,
    gender varchar
    (1) NOT NULL,
    telNo varchar
    (10) ,
    Address varchar
    (100),
    isTrainer integer(1),

    PRIMARY KEY
    (clientID)
);
CREATE TABLE Trainer
(
    TrainerID varchar(13),
    Certificate varchar(256),
    Rating FLOAT(2,1),

    PRIMARY KEY(TrainerID),
    CONSTRAINT FK_Trainer_clientID FOREIGN KEY(TrainerID) 
    REFERENCES Client(clientID) 
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Course
(
    CourseID integer(10)
    auto_increment,
        CName varchar
    (30) NOT NULL,
        Service tinyint NOT NULL ,
        Cost integer,
        CourseHour tinyint ,
        ImageUrl varchar
    (2000) ,
        CourseDescription varchar
    (170),
        TrainerID varchar
    (13),

        PRIMARY KEY
    (CourseID) ,
        CONSTRAINT FK_Course_Trainer FOREIGN KEY
    (TrainerID) 
    REFERENCES Trainer
    (TrainerID) 
    ON
    DELETE CASCADE ON
    UPDATE CASCADE
    );

    CREATE TABLE Location
    (
        LocationID integer(10)
        auto_increment,
        LocateCourseID integer
        (10),
        LName varchar
        (500) NOT NULL,
        Station varchar
        (20) ,
        lat FLOAT
        (9,7),
        lng Float
        (17, 14),

        PRIMARY KEY
        (LocationID,LocateCourseID),

        CONSTRAINT FK_Location_Course FOREIGN KEY
        (LocateCourseID)
    REFERENCES Course
        (CourseID) 
	ON
        DELETE CASCADE ON
        UPDATE CASCADE
    );



        CREATE TABLE Authen
        (
            AuthenID varchar(13) ,
            email varchar(25) ,
            password varchar(25) ,

            PRIMARY KEY(AuthenID,email , password) ,

            CONSTRAINT FK_Authen_ClientID FOREIGN KEY(AuthenID)
    REFERENCES Client(clientID) 
    ON DELETE CASCADE ON UPDATE CASCADE
        );




       