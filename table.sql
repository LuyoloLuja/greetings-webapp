create table users
(
    ID serial primary key,
    names text not null,
    timesGreeted int not null
);