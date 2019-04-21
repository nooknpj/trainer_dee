drop database if exists trainer_dee;
create database trainer_dee;
use trainer_dee;
create table Client (
  ClientID varchar(13),
  FName varchar(21) not null,
  LName varchar(21) not null,
  Gender varchar(2) not null,
  TelNo varchar(12),
  Address varchar(120),
  isTrainer int(1),
  primary key(ClientID)
);
create table Trainer (
  TrainerID varchar(13),
  SSN varchar(14) not null,
  TrainerImg varchar(256),
  trainerDescription varchar(256),
  Certificate varchar(256),
  Rating float(2, 1) not null,
  rateCount int not null,
  primary key(TrainerID),
  foreign key(TrainerID) references Client(ClientID) on delete cascade on update cascade
);
create table Course (
  CourseID int auto_increment,
  CName varchar (30) not null,
  Service tinyint not null,
  Cost int,
  CourseHour tinyint,
  ImageUrl varchar (2000),
  CourseStatus boolean not null,
  CourseDescription varchar (200),
  trainerID varchar (13),
  primary key (CourseID),
  foreign key (trainerID) references client (clientID) on
    delete cascade on
    update cascade
);
create table Reservation (
  ReservationID int auto_increment,
  ApprovedTrainerID varchar (13),
  primary key (ReservationID),
  foreign key (ApprovedTrainerID) references Client (ClientID) on
        delete cascade on
        update cascade
);
create table Authen (
  AuthenID varchar(13),
  email varchar(40) not null,
  password varchar(20) not null,
  primary key(AuthenID, email),
  foreign key(AuthenID) references Client(ClientID) on delete cascade
);
create table TimeTable (
  TimetableID varchar(13),
  Date date,
  Time time,
  Status enum('full', 'free')
);
create table Location (
  LocationID int(10) auto_increment,
  LocateCourseID int (10),
  LName varchar (500),
  Station varchar (20),
  lat float (9, 7),
  lng float (17, 14),
  primary key (LocationID, LocateCourseID),
  foreign key (locateCourseID) references Course (CourseID) on
            delete cascade on
            update cascade
);
create table Search (
  Search_ClientID varchar(13),
  Search_CourseID int,
  primary key(Search_ClientID, Search_CourseID),
  foreign key(Search_ClientID) references Client(ClientID) on delete cascade on update cascade,
  foreign key(Search_CourseID) references Course(CourseID) on delete cascade on update cascade
);
create table Contain (
  TimeClientID varchar(13),
  TimeCourseID int,
  primary key(TimeClientID, TimeCourseID),
  foreign key(TimeClientID) references Client(ClientID) on delete cascade on update cascade,
  foreign key(TimeCourseID) references Course(CourseID) on delete cascade on update cascade
);
create table ReserveCourse (
  ReservedClientID varchar(13),
  ReservedCourseID int,
  ReservedReservationID int,
  CurrentTime time,
  Duration time,
  primary key(
    ReservedClientID,
    ReservedCourseID,
    ReservedReservationID
  ),
  foreign key(ReservedClientID) references Client(ClientID) on delete cascade on update cascade,
  foreign key(ReservedCourseID) references Course(CourseID) on delete cascade on update cascade,
  foreign key(ReservedReservationID) references Reservation(ReservationID) on delete cascade on update cascade
);

-- transaction Status = {toBeAccepted,rejected,toBePaid,onGoing,finished}
create table Transaction (
  transactionID varchar (50),
  clientID varchar (13),
  courseID int,
  status varchar (20),
  token varchar(20),
  primary key (transactionID),
  foreign key (clientID) references Client (clientID),
  foreign key (courseID) references Course (courseID)
);

INSERT INTO
  Client (
    ClientID,
    FName,
    LName,
    Gender,
    TelNo,
    Address,
    isTrainer
  )
values
  (
    '0000000001',
    'Yuki',
    'Oberon',
    'F',
    '0589665489',
    '205-1017, Ikanikeisaiganaibaai, Tsurui-mura Akan-gun, Hokkaido',
    1
  ),
  (
    '0000000002',
    'Jiro',
    'Talbot',
    'M',
    '7856663214',
    '314-1187, Kasumigaseki Kasumigasekibiru(1-kai), Chiyoda-ku, Tokyo',
    1
  ),
  (
    '0000000003',
    'Rina',
    'Saltzman',
    'F',
    '7895412305',
    '269-1022, Nunobeichi, Furano-shi, Hokkaido',
    1
  ),
  (
    '0000000004',
    'Kridtin',
    'Chawalratikool',
    'M',
    '0891111111',
    'HOME',
    1
  ),
  (
    '0000000005',
    'Kongpobpisit',
    'Termphrateep',
    'M',
    '0891111112',
    'PHome',
    1
  ),
  (
    '9999999999',
    'JohnnyTheTrainer',
    'TheTrainer',
    'M',
    '0909123123',
    '7/22 M.5, Soi Ta-led, Chaofa West Rd., T. Chalong
A. Phuket 83130 Thailand',
    1
  ),
  (
    '0000000000',
    'JamesTheClient',
    'TheClient',
    'F',
    '0909123123',
    'I am James the client.My id is 0000000000',
    0
  ),
  (
    '5555555555',
    'DPLOP4_Trainer',
    'Trainer',
    'M',
    '0909',
    '83130 Thailand',
    1
  );
insert into
  trainer (
    TrainerID,
    SSN,
    TrainerDescription,
    Rating,
    TrainerImg,
    rateCount
  )
values
  ('0000000001', '123', 'helloTrainer', 0.0, '', 0),
  ('0000000002', '123', 'helloTrainer', 2.0, '', 3),
  ('0000000003', '123', 'helloTrainer', 4.7, '', 4),
  ('0000000004', '123', 'helloTrainer', 5.0, '', 1),
  ('0000000005', '123', 'helloTrainer', 3.2, '', 2),
  (
    '9999999999',
    '111111',
    'I am johny the trainer and this is my trainer description. I have the power to change lives for the better. I help clients achieve their fitness and health goals through motivation and education.',
    4.3,
    'https://www.telegraph.co.uk/content/dam/men/2016/04/22/PD68583783_dtho201_2655530b_trans_NvBQzQNjv4BqpJliwavx4coWFCaEkEsb3kvxIt-lGGWCWqwLa_RXJU8.jpg?imwidth=450',
    5
  ),
  (
    '5555555555',
    '0911515',
    'i am a trainer with an actual email',
    '3.9',
    '',
    6
  );
INSERT INTO
  Course (
    CName,
    Service,
    Cost,
    CourseHour,
    ImageUrl,
    CourseDescription,
    TrainerID,
    courseStatus
  )
values
  (
    'Fit and Health',
    '1',
    45000,
    45,
    'https://cdn.pixabay.com/photo/2016/11/11/03/50/sport-1815736_960_720.jpg',
    'This is cardio course focusing on improving your overall health. This course is recommended for everyone at every age.',
    '0000000003',
    true
  ),
  (
    'YOGA FOR FUN 12',
    '0',
    30000,
    25,
    'https://www.yogajournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_620/MTQ2MjI3ODcyMDE5OTgxOTIx/cow-face-with-eagle-arms-forhips.jpg',
    'This is just a yoga for people who want to just lay around and have fun.',
    '0000000004',
    true
  ),
  (
    'We love Fitness',
    '0',
    40000,
    25,
    'https://images.pexels.com/photos/588561/pexels-photo-588561.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'This course is designed to assess and improve physical fitness levels and encourage a healthy attitude toward lifelong fitness. ',
    '0000000005',
    true
  ),
  (
    'Yoga For Life',
    '0',
    9,
    99,
    'https://cdn1.medicalnewstoday.com/content/images/articles/318/318774/a-woman-practicing-yoga-on-the-beach.jpg',
    'yoga forever.',
    '0000000001',
    true
  ),
  (
    'Mini Marathon Prep',
    '1',
    2000,
    15,
    'https://static01.nyt.com/images/2017/10/17/science/11physed-marathon-photo/11physed-marathon-photo-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
    'I am an experienced marathon runner and I want you help you be like me!',
    '0000000002',
    true
  ),
  (
    'Full Body Cardio',
    '1',
    2500,
    10,
    'https://hips.hearstapps.com/womenshealth-production.s3.amazonaws.com/images/7685/best-cardio-for-fat-loss__medium_4x3.jpg',
    'GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!GOGOGOGOGO CARDIO!',
    '0000000004',
    true
  ),
  (
    'Intense Body Building',
    '2',
    3000,
    20,
    'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Article+Image+Update/Fitness/Benefits+of+Weight+Training/Carousel.jpg',
    'This course is only for people who have spectacularly muscular body. No Beginners!',
    '0000000002',
    true
  ),
  (
    'Weight 101',
    '2',
    2000,
    10,
    'https://www.healthline.com/hlcmsresource/images/topic_centers/1267-Muscle-build-732x549-thumbnail.jpg',
    'You want to build muscle but do not know how? Come here, take this awesome course!',
    '0000000002',
    true
  ),
  (
    'Weight loss',
    '2',
    10000,
    20,
    'https://www.mensjournal.com/wp-content/uploads/mf/_main_liftlift.jpg?w=1200&h=1200&crop=1',
    'Let loss weight and grain healthy',
    '0000000004',
    true
  ),
  (
    'CourseWithEmail',
    '1',
    500,
    10,
    'https://www.lifewire.com/thmb/mkR7ed8DYBalvSwazvJ-E-qA9FU=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/gmail-unsend-599318fd68e1a200111244db.png',
    'This course is for email sender testing.',
    '5555555555',
    true
  );
insert into
  location (LocateCourseID, Lname, lat, lng)
values
  (
    1,
    'Siam Paragon',
    13.7461123,
    100.53410770000005
  ),
  (
    2,
    'Fitness First Central World',
    13.7593369,
    100.56665410000005
  ),
  (3, 'BTS หมอชิต', 13.8022855, 100.55383099999995),
  (
    4,
    'BTS สยาม',
    13.745596421887042,
    100.53408622741699
  ),
  (
    5,
    'BTS สนามกีฬาแห่งชาติ',
    13.746492674829897,
    100.52908658981323
  ),
  (
    6,
    'BTS ราชเทวี',
    13.751911805599283,
    100.53155422210693
  ),
  (
    7,
    'BTS พญาไท',
    13.756934810946497,
    100.53378582000732
  ),
  (
    8,
    'BTS ชิดลม',
    13.744095711606409,
    100.5430555343628
  ),
  (
    9,
    'MBK Center',
    13.744470890077935,
    100.52990198135376
  ),
  (
    10,
    'MBK Center',
    13.744470890077935,
    100.52990198135376
  );
INSERT INTO
  Authen (AuthenID, email, password)
values
  (
    '0000000001',
    'DThinPLOP@hotmail.com',
    'x86akqidSAkd'
  ),
  (
    '0000000002',
    'DFivePLOP@yahoo.com',
    'Oiskajqnd448'
  ),
  (
    '0000000003',
    'DZippyPLOP@yahoo.com',
    'MksjqU293'
  ),
  (
    '0000000004',
    'DMellowPLOP@hotmail.com',
    'PlsmqjUas123'
  ),
  (
    '0000000005',
    'DDerangedPLOP@gmail.com',
    'MUM222'
  ),
  ('0000000000', 'client@gmail.com', 'client'),
  ('9999999999', 'trainer@gmail.com', 'trainer'),
  (
    '5555555555',
    'trainer.dplop4@gmail.com',
    'dplop4trainer'
  );
INSERT INTO
  transaction (transactionID,clientID, courseID, status, token)
values
  ('adddddd1','0000000000', '1', 'onGoing', '0'),
  ('adddddd2','0000000000', '2', 'toBeAccepted', '0'),
  ('adddddd3','0000000001', '1', 'toBePaid', '0'),
  ('adddddd4','0000000002', '3', 'rejected', '0'),
  ('adddddd5', '0000000003', '1', 'toBePaid', '0'),
  ('adddddd6', '0000000002', '3', 'rejected', '0'),
  ('adddddd7', '0000000003', '6', 'onGoing', '0'),
  ('adddddd8', '0000000004', '4', 'finished', '0'),
  ('adddddd9', '0000000004', '5', 'finished', '0'); 


  -- create table Payment (
--   PaymentID int auto_increment,
--   PaymentRequestID int,
--   Amount float,
--   ExpiredDate date,
--   CVV int (3),
--   CardHolderName varchar (30),
--   CardNumber varchar (20),
--   primary key (PaymentID, PaymentRequestID),
--   foreign key (PaymentRequestID) references Request (RequestID) on
--                     delete cascade on
--                     update cascade
-- );
-- ------------------------------------------------------------------------------------------------
-- create table Explore (
--   ExpClientID varchar(13),
--   ExpCourseID int,
--   primary key(ExpClientID, ExpCourseID),
--   foreign key(ExpClientID) references Client(ClientID) on delete cascade on update cascade,
--   foreign key(ExpCourseID) references Course(CourseID) on delete cascade on update cascade
-- );
-- create table Request (
--   RequestID int auto_increment,
--   TrainerAcceptingID varchar (13),
--   primary key (RequestID, TrainerAcceptingID),
--   foreign key (TrainerAcceptingID) references Client (ClientID) on
--                 delete cascade on
--                 update cascade
-- );
-- create table SendToBuy (
--   ClientSendingID varchar(13),
--   CourseSentID int,
--   TrainerSentID varchar(13),
--   isAccept boolean default false,
--   isCanceled boolean default false,
--   primary key(ClientSendingID, CourseSentID, TrainerSentID),
--   foreign key(ClientSendingID) references Client(ClientID) on delete cascade on update cascade,
--   foreign key(CourseSentID) references Course(CourseID) on delete cascade on update cascade,
--   foreign key(TrainerSentID) references Trainer(TrainerID) on delete cascade on update cascade
-- );