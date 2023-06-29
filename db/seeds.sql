INSERT INTO users (user_name,password,first_name,last_name,email,mobile_phone,bed_time)
VALUES
    ( "user1","password","Renzo","San Jaun","test1@test.com",1111111111,"22:00:00"),
    ( "user2","password","Matt","Miceli","test2@test.com",2222222222,"00:00:00"),
    ( "user3","password","Christina","Hoang","test3@test.com",3333333333,"21:00:00"),
    ( "user4","password","Jorden","Lockhart","test4@test.com",4444444444,"21:00:00"),
    ( "user5","password","Bia","Shimizu","test5@test.com",5555555555,"23:00:00"),
    ( "user6","password","Bob","McBob","test6@test.com",6666666666,"20:00:00");

INSERT INTO chats (user_id,chat_name)
VALUES
    (1,"Chat with Matt"),
    (1,"Chat with Christina"),
    (1,"Chat with Jorden"),
    (1,"Chat with Bia"),
    (1,"Chat with Bob"),
    (1,"Chat with Christina and Bia"),
    (2,"Chat with Jordan"),
    (6,"Chat with Bia"),
    (1,"Chat with Debug Thugs");

INSERT INTO chats_users_mapping (user_id,chat_id)
VALUES
    (1,1),
    (2,1),
    (1,2),
    (3,2),
    (1,3),
    (4,3),
    (1,4),
    (5,4),
    (1,5),
    (6,5),
    (1,6),
    (3,6),
    (5,6),
    (2,7),
    (4,7),
    (5,8),
    (6,8),
    (1,9),
    (2,9),
    (3,9),
    (4,9),
    (5,9);

INSERT INTO messages (chat_id,user_id,message_text)
VALUES
    (9,1,"Get ready to present our project."),
    (9,5,"I'm not ready for this project"),
    (9,5,"Hopefully this is working correctly");