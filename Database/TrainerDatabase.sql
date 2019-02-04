DROP DATABASE IF EXISTS trainer ;
CREATE DATABASE trainer ;

use trainer ;

CREATE TABLE User (
	userID varchar(10) auto_increment,
    SSN varchar(13) ,
    FName varchar(20),
    SName varchar(20) ,
    Gender varchar(1) ,
    DateOfBirth date ,
    NickName varchar(10),
    Address varchar(100),
    PRIMARY KEY(userID)
 );
 CREATE TABLE Trainer(
	TrainerID varchar(10),
    Certificate varchar(256),
    PRIMARY KEY(TrainerID),
    CONSTRAINT FK_Trainer_User FOREIGN KEY(TrainerID) 
    REFERENCES User(UserID) 
    ON DELETE CASCADE ON UPDATE CASCADE
 );
 CREATE TABLE Course(
	CourseID varchar(10) ,
    Service varchar(10) ,
    CName varchar(30) ,
    Description varchar(100),
    TrainerID varchar(10),
    PRIMARY KEY (CourseID) ,
    CONSTRAINT FK_Course_Trainer FOREIGN KEY(TrainerID) 
    REFERENCES Trainer(TrainerID) 
    ON DELETE CASCADE ON UPDATE CASCADE
 );
 
 CREATE TABLE Location(
	LocationID varchar(10) ,
    LocateCourseID varchar(10) ,
    LName varchar(20) ,
    Station varchar(20) ,
    PRIMARY KEY (LocationID,LocateCourseID),
    CONSTRAINT FK_Location_Course FOREIGN KEY(LocateCourseID)
    REFERENCES Course(CourseID) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Search(
	Search_UserID varchar(10) ,
    Search_CourseID varchar(10) ,
    PRIMARY KEY (Search_UserID,Search_CourseID),
    CONSTRAINT FK_Search_Course FOREIGN KEY(Search_CourseID)
    REFERENCES Course(CourseID) ,
    CONSTRAINT FK_Search_User FOREIGN KEY(Search_UserID)
    REFERENCES User(UserID) 
	
);

CREATE TABLE Client(
	ClientID varchar(10) ,
    PRIMARY KEY (ClientID) ,
    CONSTRAINT FK_Client_User FOREIGN KEY(ClientID)
    REFERENCES User(UserID) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Authen(
	AuthenID varchar(10) ,
    Username varchar(20) ,
    Password varchar(20) ,
    PRIMARY KEY(AuthenID,Username , Password) ,
    CONSTRAINT FK_Authen_User FOREIGN KEY(AuthenID)
    REFERENCES User(userID) 
    ON DELETE CASCADE ON UPDATE CASCADE
);