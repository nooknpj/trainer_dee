drop database if exists trainer_dee;

create database trainer_dee;

use trainer_dee;

create table Client
(
    ClientID varchar(13),
    FName varchar(21) not null,
    LName varchar(21) not null,
    Gender varchar(2) not null,
    TelNo varchar(12),
    Address varchar(120),
    isTrainer int(1),

    primary key(ClientID)
);

create table Course
(
    CourseID int auto_increment,
    CName varchar(30) not null,
    Service tinyint not null,
    Cost int,
    CourseHour tinyint,
    ImageUrl varchar(2000),
    CourseStatus enum('show', 'hide'),
    CourseDescription varchar(200),
    SeenClientID varchar(13),
    PostedTrainerID varchar(13),
    
    primary key(CourseID),
    foreign key(SeenClientID) references Client(ClientID) on delete cascade on update cascade,
    foreign key(PostedTrainerID) references Client(ClientID) on delete cascade on update cascade
);

create table Trainer
(
    TrainerID varchar(13),
    SSN varchar(14) not null,
    TrainerImg varchar(256),
    trainerDescription varchar(256),
    Certificate varchar(256),
    Rating float(2, 1),

    primary key(TrainerID),
    foreign key(TrainerID) references Client(ClientID) on delete cascade on update cascade
);

create table Reservation
(
	ReservationID int auto_increment,
    ApprovedTrainerID varchar(13),
    
    primary key(ReservationID),
    foreign key(ApprovedTrainerID) references Client(ClientID) on delete cascade on update cascade
);

create table Authen
(
	AuthenID varchar(13),
    email varchar(40) not null,
    password varchar(20) not null,
    
    primary key(AuthenID, email),
    foreign key(AuthenID) references Client(ClientID) on delete cascade
);

create table TimeTable
(
	TimetableID varchar(13),
    Date date,
    Time time,
    Status enum('full', 'free')
);

create table Location
(
	LocationID int(10) auto_increment,
    LocateCourseID int(10),
    LName varchar(500),
    Station varchar(20),
    lat float(9, 7),
    lng float(17, 14),
    
    primary key(LocationID, LocateCourseID),
    foreign key(locateCourseID) references Course(CourseID) on delete cascade on update cascade
);

create table Search
(
	Search_ClientID varchar(13),
    Search_CourseID int,
    
    primary key(Search_ClientID, Search_CourseID),
    foreign key(Search_ClientID) references Client(ClientID) on delete cascade on update cascade,
    foreign key(Search_CourseID) references Course(CourseID) on delete cascade on update cascade
);

create table Contain
(
	TimeClientID varchar(13),
    TimeCourseID int,
    
    primary key(TimeClientID, TimeCourseID),
    foreign key(TimeClientID) references Client(ClientID) on delete cascade on update cascade,
    foreign key(TimeCourseID) references Course(CourseID) on delete cascade on update cascade
);

create table ReserveCourse
(
	ReservedClientID varchar(13),
    ReservedCourseID int,
    ReservedReservationID int,
    CurrentTime time,
    Duration time,
    
    primary key(ReservedClientID, ReservedCourseID, ReservedReservationID),
    foreign key(ReservedClientID) references Client(ClientID) on delete cascade on update cascade,
    foreign key(ReservedCourseID) references Course(CourseID) on delete cascade on update cascade,
    foreign key(ReservedReservationID) references Reservation(ReservationID) on delete cascade on update cascade
);

create table Explore
(
	ExpClientID varchar(13),
    ExpCourseID int,
    
    primary key(ExpClientID, ExpCourseID),
    foreign key(ExpClientID) references Client(ClientID) on delete cascade on update cascade,
    foreign key(ExpCourseID) references Course(CourseID) on delete cascade on update cascade
);

create table Request
(
	RequestID int auto_increment,
    TrainerAcceptingID varchar(13),
    
    primary key(RequestID, TrainerAcceptingID),
    foreign key(TrainerAcceptingID) references Client(ClientID) on delete cascade on update cascade
);

create table SendToBuy
(
	ClientSendingID varchar(13),
    CourseSentID int,
    TrainerSentID varchar(13),
    isAccept boolean default false,
    isCanceled boolean default false,
    
    primary key(ClientSendingID, CourseSentID, TrainerSentID),
    foreign key(ClientSendingID) references Client(ClientID) on delete cascade on update cascade,
    foreign key(CourseSentID) references Course(CourseID) on delete cascade on update cascade,
    foreign key(TrainerSentID) references Trainer(TrainerID) on delete cascade on update cascade
);

create table Payment
(
    PaymentID int auto_increment,
    PaymentRequestID int,
    Amount float,
    ExpiredDate date,
    CVV int(3),
    CardHolderName varchar(30),
    CardNumber varchar(20),
    
    primary key(PaymentID, PaymentRequestID),
    foreign key(PaymentRequestID) references Request(RequestID) on delete cascade on update cascade
);

