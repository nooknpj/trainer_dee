DROP DATABASE IF EXISTS trainer_dee
;
CREATE DATABASE trainer_dee ;

use trainer_dee
;

CREATE TABLE Client
(
    ClientID varchar(13) ,

    FName varchar
    (21) NOT NULL,
    LName varchar
    (21) NOT NULL,
    Gender varchar
    (2) NOT NULL,
    TelNo varchar
    (11) ,
    Address varchar
    (120),
    isTrainer integer
    (1),

    PRIMARY KEY(ClientID)
);
CREATE TABLE Trainer
(
    TrainerID varchar(13),
    trainerDescription varchar(200),
    SSN varchar
    (14) NOT NULL,
    Certificate varchar(256),
    Rating FLOAT(2,1),
    trainerImg varchar(256),

    PRIMARY KEY(TrainerID),
    CONSTRAINT FK_Trainer_Client FOREIGN KEY(TrainerID) 
    REFERENCES Client(ClientID) 
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Course
(
    CourseID integer(11)
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
        DELETE CASCADE 
    ON
        UPDATE CASCADE
    );

        CREATE TABLE Search
        (
            Search_ClientID varchar(13) ,
            Search_CourseID integer(11) ,

            PRIMARY KEY (Search_ClientID,Search_CourseID),

            CONSTRAINT FK_Search_Course FOREIGN KEY(Search_CourseID)
    REFERENCES Course(CourseID) ,
            CONSTRAINT FK_Search_Client FOREIGN KEY(Search_ClientID)
    REFERENCES Client(ClientID)

        );


        CREATE TABLE Authen
        (
            AuthenID varchar(13) ,
            email varchar(40) NOT NULL ,
            password varchar(20) NOT NULL,

            PRIMARY KEY(AuthenID,email) ,



            CONSTRAINT FK_Authen_ClientID FOREIGN KEY(AuthenID)
	REFERENCES Client(ClientID) 
	ON DELETE CASCADE


        );

        INSERT INTO Client
            (ClientID , FName , LName , Gender , TelNo , Address,isTrainer)
        values
            ('0000000001', 'Yuki', 'Oberon', 'F', '0589665489' , '205-1017, Ikanikeisaiganaibaai, Tsurui-mura Akan-gun, Hokkaido', 1) ,
            ('0000000002', 'Jiro', 'Talbot', 'M', '7856663214', '314-1187, Kasumigaseki Kasumigasekibiru(1-kai), Chiyoda-ku, Tokyo', 1),
            ('0000000003', 'Rina', 'Saltzman', 'F', '7895412305', '269-1022, Nunobeichi, Furano-shi, Hokkaido', 1),
            ('0000000004', 'Kridtin', 'Chawalratikool', 'M', '0891111111', 'HOME', 1),
            ('0000000005', 'Kongpobpisit', 'Termphrateep', 'M', '0891111112', 'PHome', 1),
            ('9999999999', 'JohnnyTheTrainer', 'TheTrainer', 'M', '0909123123', '7/22 M.5, Soi Ta-led, Chaofa West Rd., T. Chalong
A. Phuket 83130 Thailand', 1),
            ('0000000000', 'JamesTheClient', 'TheClient', 'F', '0909123123', 'I am James the client.My id is 0000000000', 0);

        insert into trainer
            (TrainerID,SSN,TrainerDescription, Rating,TrainerImg)
        values
            ('0000000001', '123', 'helloTrainer', 3.5, ''),
            ('0000000002', '123', 'helloTrainer', 2.0, ''),
            ('0000000003', '123', 'helloTrainer', 4.7, ''),
            ('0000000004', '123', 'helloTrainer', 5.0, ''),
            ('0000000005', '123', 'helloTrainer', 3.2, ''),
            ('9999999999', '111111', 'I am johny the trainer and this is my trainer description. I have the power to change lives for the better. I help clients achieve their fitness and health goals through motivation and education.', 4.3, 'https://www.telegraph.co.uk/content/dam/men/2016/04/22/PD68583783_dtho201_2655530b_trans_NvBQzQNjv4BqpJliwavx4coWFCaEkEsb3kvxIt-lGGWCWqwLa_RXJU8.jpg?imwidth=450');

        INSERT INTO Course
            (CName ,Service,Cost,CourseHour,ImageUrl , CourseDescription , TrainerID )
        values
            ('Fit and Health', '1', 45000, 45, 'https://darebee.com/images/workouts/time-crunch-cardio-workout.jpg', 'This is cardio course focusing on improving your overall health. This course is recommended for everyone at every age.', '0000000003'),
            ('YOGA FOR FUN 12', '0', 30000, 25, 'https://www.yogajournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_620/MTQ2MjI3ODcyMDE5OTgxOTIx/cow-face-with-eagle-arms-forhips.jpg', 'This is just a yoga for people who want to just lay around and have fun.', '0000000004') ,
            ('We love Fitness', '0', 40000, 25, 'https://images.pexels.com/photos/588561/pexels-photo-588561.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'This course is designed to assess and improve physical fitness levels and encourage a healthy attitude toward lifelong fitness. ', '0000000005'),
            ('Yoga For Life', '0', 9, 99, 'https://cdn1.medicalnewstoday.com/content/images/articles/318/318774/a-woman-practicing-yoga-on-the-beach.jpg', 'yoga forever.', '0000000001'),
            ('Mini Marathon Prep', '1', 2000, 15, 'https://static01.nyt.com/images/2017/10/17/science/11physed-marathon-photo/11physed-marathon-photo-articleLarge.jpg?quality=75&auto=webp&disable=upscale', 'I am an experienced marathon runner and I want you help you be like me!', '0000000002'),
            ('Full Body Cardio', '1', 2500, 10, 'https://hips.hearstapps.com/womenshealth-production.s3.amazonaws.com/images/7685/best-cardio-for-fat-loss__medium_4x3.jpg', 'GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!', '0000000004'),
            ('Intense Body Building', '2', 3000, 20, 'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Article+Image+Update/Fitness/Benefits+of+Weight+Training/Carousel.jpg', 'This course is only for people who have spectacularly muscular body. No Beginners!', '0000000002'),
            ('Weight 101', '2', 2000, 10, 'https://www.healthline.com/hlcmsresource/images/topic_centers/1267-Muscle-build-732x549-thumbnail.jpg', 'You want to build muscle but do not know how? Come here, take this awesome course!', '0000000002'),
            ('Weight loss', '2', 10000, 20, 'https://www.mensjournal.com/wp-content/uploads/mf/_main_liftlift.jpg?w=1200&h=1200&crop=1', 'Let loss weight and grain healthy', '0000000004');
        insert into location
            (LocateCourseID, Lname, lat, lng)
        values
            (1, 'Siam Paragon', 13.7461123, 100.53410770000005),
            (2, 'Fitness First Central World', 13.7593369, 100.56665410000005),
            (3, 'BTS หมอชิต', 13.8022855, 100.55383099999995),
            (4, 'BTS สยาม', 13.745596421887042, 100.53408622741699),
            (5, 'BTS สนามกีฬาแห่งชาติ' , 13.746492674829897, 100.52908658981323),
            (6, 'BTS ราชเทวี', 13.751911805599283, 100.53155422210693),
            (7, 'BTS พญาไท', 13.756934810946497, 100.53378582000732),
            (8, 'BTS ชิดลม', 13.744095711606409, 100.5430555343628),
            (9, 'MBK Center', 13.744470890077935, 100.52990198135376);

        INSERT INTO Authen
            (AuthenID , email , password)
        values
            ('0000000001', 'DThinPLOP@hotmail.com', 'x86akqidSAkd'),
            ('0000000002', 'DFivePLOP@yahoo.com', 'Oiskajqnd448'),
            ('0000000003', 'DZippyPLOP@yahoo.com', 'MksjqU293'),
            ('0000000004', 'DMellowPLOP@hotmail.com', 'PlsmqjUas123'),
            ('0000000005', 'DDerangedPLOP@gmail.com', 'MUM222'),
            ('0000000000', 'client@gmail.com', 'client'),
            ('9999999999', 'trainer@gmail.com', 'trainer');
            