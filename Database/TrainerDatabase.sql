DROP DATABASE IF EXISTS trainer_dee
;
CREATE DATABASE trainer_dee ;

use trainer_dee
;

CREATE TABLE User
(
    userID integer(10)
    auto_increment,
    SSN varchar
    (13) NOT NULL,
    FName varchar
    (20) NOT NULL,
    SName varchar
    (20)  NOT NULL,
    Gender varchar
    (1)  NOT NULL,
    DateOfBirth date  NOT NULL,
    TelNo varchar
    (10) , 
    NickName varchar
    (10),
    Address varchar
    (100),
    
    PRIMARY KEY
    (userID)
 );
    CREATE TABLE Trainer
    (
        TrainerID integer(10),
        Certificate varchar(256),
        Rating FLOAT(2,1),

        PRIMARY KEY(TrainerID),
        CONSTRAINT FK_Trainer_User FOREIGN KEY(TrainerID) 
    REFERENCES User(UserID) 
    ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE TABLE Course
    (
        CourseID varchar(10) ,
        CName varchar(30) NOT NULL,
        Service tinyint NOT NULL ,
        Cost integer,
        CourseHour tinyint ,
        ImageUrl varchar(2000) ,
        CourseDescription varchar(100),
        TrainerID integer(10),

        PRIMARY KEY (CourseID) ,
        CONSTRAINT FK_Course_Trainer FOREIGN KEY(TrainerID) 
    REFERENCES Trainer(TrainerID) 
    ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE Location
    (
        LocationID varchar(10) ,
        LocateCourseID varchar(10) ,
        LName varchar(20) NOT NULL,
        Station varchar(20) ,

        PRIMARY KEY (LocationID,LocateCourseID),

        CONSTRAINT FK_Location_Course FOREIGN KEY(LocateCourseID)
    REFERENCES Course(CourseID) 
	ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE Search
    (
        Search_UserID integer(10) ,
        Search_CourseID varchar(10) ,

        PRIMARY KEY (Search_UserID,Search_CourseID),

        CONSTRAINT FK_Search_Course FOREIGN KEY(Search_CourseID)
    REFERENCES Course(CourseID) ,
        CONSTRAINT FK_Search_User FOREIGN KEY(Search_UserID)
    REFERENCES User(UserID)

    );

    CREATE TABLE Client
    (
        ClientID integer(10) ,

        PRIMARY KEY (ClientID) ,

        CONSTRAINT FK_Client_User FOREIGN KEY(ClientID)
    REFERENCES User(UserID) 
	ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE Authen
    (
        AuthenID integer(10) ,
        Username varchar(20) ,
        UserPassword varchar(20) ,

        PRIMARY KEY(AuthenID,Username , UserPassword) ,

        CONSTRAINT FK_Authen_User FOREIGN KEY(AuthenID)
    REFERENCES User(userID) 
    ON DELETE CASCADE ON UPDATE CASCADE
    );

    INSERT INTO User
        (SSN , FName , SName , Gender , DateOfBirth, NickName , TelNo , Address)
    values
        ('1103698745210', 'Yuki', 'Oberon', 'F', '1995-06-13', 'Mini', '0589665489' , '205-1017, Ikanikeisaiganaibaai, Tsurui-mura Akan-gun, Hokkaido') ,
        ('5521368954697', 'Jiro', 'Talbot', 'M', '1998-4-10', 'Loki', '7856663214', '314-1187, Kasumigaseki Kasumigasekibiru(1-kai), Chiyoda-ku, Tokyo'),
        ('1245869852317', 'Rina', 'Saltzman', 'F', '1996-5-3', 'Rina', '7895412305', '269-1022, Nunobeichi, Furano-shi, Hokkaido');

    insert into user
        (SSN, FName, SName, Gender, DateOfBirth, NickName, Address)
    values
        ('1010101010101', 'Kridtin', 'Chawalratikool', 'M', '19971010', 'Kan', 'HOME')
,
        ('2020202020202', 'Kongpobpisit', 'Termphrateep', 'M', '19981202', 'Porsche', 'PHome');

    insert into trainer
        (TrainerID, Rating)
    values
        (0000000001, 3.5)
,
        (0000000002, 2.0)
,
        (0000000003, 4.7)
,
        (0000000004, 5.0)
,
        (0000000005, 3.2);

    INSERT INTO Course
        (CourseID , CName ,Service,Cost,CourseHour,ImageUrl , CourseDescription , TrainerID )
    values
        ('555212', 'Fit and Health', '1', 45000, 45, '', 'abc', 0000000003),
        ('555213', 'YOGA FOR FUN 12', '0', 30000, 25, '', 'ABD', 0000000004) ,
        ('555214', 'We love Fitness', '0', 40000, 25, '', 'Find some ...', 0000000005),
        ('000001', 'Yoga For Life', '0', 9, 10, 'imgHere', 'yoga forever', '0000000001'),
        ('000002', 'Mini Marathon Prep', '1', 2000, 15, 'marathonBoy', '20km marathon preparation', '0000000002'),
        ('000003', 'Full Body Cardio', '1', 2500, 10, 'img', 'GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!', 0000000004),
        ('000004', 'Body Builders', '2', 3000, 20, '', 'welcome', 0000000002),
        ('000005', 'Weight 101', '2', 2000, 10, '', 'beginner training', 0000000002);
 