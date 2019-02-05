DROP DATABASE IF EXISTS trainer_dee ;
CREATE DATABASE trainer_dee ;

use trainer_dee ;

CREATE TABLE User (
	userID integer(10) auto_increment,
    SSN varchar(13) NOT NULL,
    FName varchar(20) NOT NULL,
    SName varchar(20)  NOT NULL,
    Gender varchar(1)  NOT NULL,
    DateOfBirth date  NOT NULL,
    TelNo varchar(10) , 
    NickName varchar(10),
    Address varchar(100),
    
    PRIMARY KEY(userID)
 );
 CREATE TABLE Trainer(
	TrainerID integer(10),
    Certificate varchar(256),
    
    PRIMARY KEY(TrainerID),
    CONSTRAINT FK_Trainer_User FOREIGN KEY(TrainerID) 
    REFERENCES User(UserID) 
    ON DELETE CASCADE ON UPDATE CASCADE
 );
 CREATE TABLE Course(
	CourseID varchar(10) ,
    CName varchar(30) NOT NULL,
    Service tinyint NOT NULL ,
    Cost integer,
	CourseHour  tinyint ,
    ImageUrl varchar(2000) ,
    courseDescription varchar(100),
    TrainerID integer(10),
    
    PRIMARY KEY (CourseID) ,
    CONSTRAINT FK_Course_Trainer FOREIGN KEY(TrainerID) 
    REFERENCES Trainer(TrainerID) 
    ON DELETE CASCADE ON UPDATE CASCADE
 );
 
 CREATE TABLE Location(
	LocationID varchar(10) ,
    LocateCourseID varchar(10) ,
    LName varchar(20) NOT NULL,
    Station varchar(20) ,
    
    PRIMARY KEY (LocationID,LocateCourseID),
    
    CONSTRAINT FK_Location_Course FOREIGN KEY(LocateCourseID)
    REFERENCES Course(CourseID) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Search(
	Search_UserID integer(10) ,
    Search_CourseID varchar(10) ,
    
    PRIMARY KEY (Search_UserID,Search_CourseID),
    
    CONSTRAINT FK_Search_Course FOREIGN KEY(Search_CourseID)
    REFERENCES Course(CourseID) ,
    CONSTRAINT FK_Search_User FOREIGN KEY(Search_UserID)
    REFERENCES User(UserID) 
	
);

CREATE TABLE Client(
	ClientID integer(10) ,
    
    PRIMARY KEY (ClientID) ,
    
    CONSTRAINT FK_Client_User FOREIGN KEY(ClientID)
    REFERENCES User(UserID) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Authen(
	AuthenID integer(10) ,
    Username varchar(20) ,
    UserPassword varchar(20) ,
    
    PRIMARY KEY(AuthenID,Username , UserPassword) ,
    
    CONSTRAINT FK_Authen_User FOREIGN KEY(AuthenID)
    REFERENCES User(userID) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO User(SSN , FName , SName , Gender , DateOfBirth ,  NickName , Address) 
values ('1103698745210','Yuki','Oberon','F','1995-06-13','Mini','205-1017, Ikanikeisaiganaibaai, Tsurui-mura Akan-gun, Hokkaido') ,
		('5521368954697','Jiro','Talbot','M','1998-4-10','Loki','314-1187, Kasumigaseki Kasumigasekibiru(1-kai), Chiyoda-ku, Tokyo'),
        ('1245869852317','Rina','Saltzman','F','1996-5-3','Rina','269-1022, Nunobeichi, Furano-shi, Hokkaido');
        
INSERT INTO Course(CourseID , CName ,Service , CourseDescription , TrainerID ) 
values ('555212','Fit and Health','1','Find some ...','265874') ;