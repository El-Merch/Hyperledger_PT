PGDMP     2                    }            postgres    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    5    postgres    DATABASE     |   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3350                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false                       0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    35024    pedidos    TABLE     �   CREATE TABLE public.pedidos (
    id integer NOT NULL,
    remitente character varying(255),
    descripcion character varying(255),
    estado character varying(100),
    fecha_entrada timestamp without time zone
);
    DROP TABLE public.pedidos;
       public         heap    postgres    false            �            1259    35023    pedidos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pedidos_id_seq;
       public          postgres    false    218                       0    0    pedidos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;
          public          postgres    false    217            �            1259    35033    timeline    TABLE     �   CREATE TABLE public.timeline (
    id integer NOT NULL,
    pedido_id integer,
    label character varying(255),
    date timestamp without time zone,
    status character varying(50)
);
    DROP TABLE public.timeline;
       public         heap    postgres    false            �            1259    35032    timeline_id_seq    SEQUENCE     �   CREATE SEQUENCE public.timeline_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.timeline_id_seq;
       public          postgres    false    220                       0    0    timeline_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.timeline_id_seq OWNED BY public.timeline.id;
          public          postgres    false    219            �            1259    35011    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password text NOT NULL,
    nombre_usuario character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    35010    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            r           2604    35027 
   pedidos id    DEFAULT     h   ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);
 9   ALTER TABLE public.pedidos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            s           2604    35036    timeline id    DEFAULT     j   ALTER TABLE ONLY public.timeline ALTER COLUMN id SET DEFAULT nextval('public.timeline_id_seq'::regclass);
 :   ALTER TABLE public.timeline ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            p           2604    35014    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    35024    pedidos 
   TABLE DATA           T   COPY public.pedidos (id, remitente, descripcion, estado, fecha_entrada) FROM stdin;
    public          postgres    false    218   L                 0    35033    timeline 
   TABLE DATA           F   COPY public.timeline (id, pedido_id, label, date, status) FROM stdin;
    public          postgres    false    220   �                 0    35011    users 
   TABLE DATA           S   COPY public.users (id, username, password, nombre_usuario, created_at) FROM stdin;
    public          postgres    false    216   �                   0    0    pedidos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pedidos_id_seq', 3, true);
          public          postgres    false    217                       0    0    timeline_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.timeline_id_seq', 12, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    215            y           2606    35031    pedidos pedidos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pkey;
       public            postgres    false    218            {           2606    35038    timeline timeline_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.timeline
    ADD CONSTRAINT timeline_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.timeline DROP CONSTRAINT timeline_pkey;
       public            postgres    false    220            u           2606    35019    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            w           2606    35021    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            |           2606    35039     timeline timeline_pedido_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.timeline
    ADD CONSTRAINT timeline_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.timeline DROP CONSTRAINT timeline_pedido_id_fkey;
       public          postgres    false    218    220    3193               �   x�m���  ���S�������J[���к0�Ŧ��޿�9�����_�gE�ط/���[����.�2��C!��D�99�I+������{��KѺŌq�IP���p2i��PT����w�/F�g+M         �   x���K
�0��ur�\��G�՝�[���t*����z����
"i���f�a���i��$��儉���(E�^]-T���^�ZI��I�>�{m2���CX >qv�߳?�|ؓ��-Fpџxi*K6Vݮ`ZV�X�'&P���V�l﭂ '�kW�HL|�1��s�E�������w�~]-u�3���"mO3��{�J         S   x�3�LL����4426�t13�K�S�8��Lu�u����,�-��,M��8}S��38���3!�||b���� �t     