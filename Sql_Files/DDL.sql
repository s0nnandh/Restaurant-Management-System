DROP TABLE IF EXISTS special_items;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS ingredients_used;
DROP TABLE IF EXISTS ingredients_purchased;
DROP TABLE IF EXISTS required_;
DROP TABLE IF EXISTS can_cook;
DROP TABLE IF EXISTS order_;
DROP TABLE IF EXISTS delivery_person;
DROP TABLE IF EXISTS chef;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS table_;
DROP TABLE IF EXISTS area;

CREATE SEQUENCE IF NOT EXISTS public.person_seq
    START WITH 501
    INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS public.area_seq
    START WITH 101
    INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS public.table_seq
    START WITH 16
    INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS public.item_seq
    START WITH 101
    INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS public.ingredient_seq
    START WITH 206
    INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS public.order_seq
    START WITH 1001
    INCREMENT BY 1;



CREATE TABLE area (
    area_id         INT DEFAULT nextval('public.area_seq'::regclass),
    locality        TEXT            NOT NULL,
    city            TEXT            NOT NULL,
    pincode         NUMERIC(6,0)    NOT NULL,
    PRIMARY KEY(area_id)
);

CREATE TABLE table_ (
    table_id         INT DEFAULT nextval('public.table_seq'::regclass),
    capacity         INT CHECK(capacity BETWEEN 1 AND 12),
    position         TEXT,
    availability    BOOLEAN         NOT NULL,
    PRIMARY KEY(table_id)
);

CREATE TABLE item (
    item_id         INT DEFAULT nextval('public.item_seq'::regclass),
    item_name       TEXT            NOT NULL    UNIQUE,
    category        TEXT            NOT NULL    CHECK(category='Starter' or category='Main-Course'or category='Dessert'or category='Beverage' or category='Snack-Item'),
    cost            NUMERIC(6,0)    NOT NULL,
    availability    BOOLEAN         NOT NULL,
    is_veg          BOOLEAN         NOT NULL,
    PRIMARY KEY(item_id)
);

CREATE TABLE ingredient (
    ingredient_id    INT DEFAULT nextval('public.ingredient_seq'::regclass),
    name        TEXT NOT NULL UNIQUE,
    PRIMARY KEY(ingredient_id)
);

CREATE TABLE person (
    id              INT     DEFAULT nextval('public.person_seq'::regclass),
    name            TEXT    NOT NULL,
    phone_number    TEXT     NOT NULL   UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE customer (
    id              INT,
    age             INT,
    discount        INT     NOT NULL    DEFAULT 0,
    default_address INT,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES person ON DELETE SET NULL,
    FOREIGN KEY(default_address) REFERENCES area ON DELETE SET NULL
);

CREATE TABLE employee (
    id                  INT,
    shift_start_time    TIME    NOT NULL,
    shift_end_time      TIME    NOT NULL,
    employee_type       TEXT    NOT NULL    CHECK(employee_type='Manager' or employee_type='Chef' or employee_type='Waiter' or employee_type='Delivery-Person' or employee_type='Other'),
    salary              INT     NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES person ON DELETE SET NULL
);

CREATE TABLE chef (
    id              INT,
    cuisine         TEXT,
    chef_rank       TEXT    NOT NULL    CHECK(chef_rank='Head Chef' or chef_rank='Sous Chef' or chef_rank='Station Chef' or chef_rank='Pastry Chef' or chef_rank='Other'),
    availability    BOOLEAN NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES employee ON DELETE SET NULL
);

CREATE TABLE delivery_person (
    id              INT,
    average_rating  NUMERIC(3, 2)   NOT NULL    CHECK(average_rating BETWEEN 2.5 AND 5),
    primary_area    INT             NOT NULL,
    availability    BOOLEAN         NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES employee ON DELETE SET NULL,
    FOREIGN KEY(primary_area) REFERENCES area ON DELETE SET NULL
);

CREATE TABLE order_ (
    order_id         INT DEFAULT nextval('public.order_seq'::regclass),
    total_cost       INT NOT NULL,
    payment_method   TEXT NOT NULL CHECK(payment_method='Cash' or payment_method='Card' or payment_method='UPI'),
    order_mode       TEXT NOT NULL CHECK(order_mode='Online' or order_mode='In-person'),
    status           TEXT NOT NULL CHECK(status='Ordered' or status='Prepared'or status='Delivered'or status='Completed'),
    table_id         INT, 
    placing_time     TIME NOT NULL,
    customer_id      INT,
    delivery_area    INT,
    delivery_person_id INT,
    delivery_rating  NUMERIC(3, 2),
    order_date       DATE NOT NULL,
    order_rating     NUMERIC(3, 2),
    PRIMARY KEY(order_id),
    FOREIGN KEY(table_id) REFERENCES table_ ON DELETE SET NULL,
    FOREIGN KEY(customer_id) REFERENCES customer ON DELETE SET NULL,
    FOREIGN KEY(delivery_area) REFERENCES area ON DELETE SET NULL,
    FOREIGN KEY(delivery_person_id) REFERENCES delivery_person ON DELETE SET NULL  
);

CREATE TABLE can_cook (
    chef_id         INT,
    item_id         INT,
    PRIMARY KEY(item_id, chef_id),
    FOREIGN KEY(item_id) REFERENCES item ON DELETE SET NULL,
    FOREIGN KEY(chef_id) REFERENCES chef ON DELETE SET NULL
);

CREATE TABLE required_ (
    item_id         INT,
    ingredient_id   INT,
    quantity        INT NOT NULL,
    PRIMARY KEY(item_id, ingredient_id),
    FOREIGN KEY(item_id) REFERENCES item ON DELETE SET NULL,
    FOREIGN KEY(ingredient_id) REFERENCES ingredient ON DELETE SET NULL
);

CREATE TABLE ingredients_purchased (
    date            DATE,
    ingredient_id   INT,
    quantity        INT NOT NULL,
    PRIMARY KEY(date, ingredient_id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient ON DELETE SET NULL
);

CREATE TABLE ingredients_used (
    date            DATE,
    ingredient_id   INT,
    quantity        INT NOT NULL,
    PRIMARY KEY(date, ingredient_id),
    FOREIGN KEY(ingredient_id) REFERENCES ingredient ON DELETE SET NULL
);

CREATE TABLE order_items (
    item_id          INT,
    order_id         INT,
    item_quantity    INT NOT NULL,
    PRIMARY KEY(item_id,order_id),
    FOREIGN KEY(item_id) REFERENCES item ON DELETE SET NULL,
    FOREIGN KEY(order_id) REFERENCES order_ ON DELETE SET NULL
);


CREATE TABLE special_items (
    date            DATE,
    item_id         INT,
    PRIMARY KEY(date, item_id),
    FOREIGN KEY(item_id) REFERENCES item ON DELETE SET NULL
);