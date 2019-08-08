use robot_conf;

create table if not exists server(
	address varchar(255) not null,
    port int not null
);

create table if not exists wifi(
	name varchar(255) not null,
    password varchar(255) null
);

create table if not exists bracelet(
    id int auto_increment primary key,
	mac varchar(255) not null
);

create table if not exists settings(
	camera_resolution varchar(10) not null,
    audio_frequency smallint not null,
    gps varchar(255) null
);