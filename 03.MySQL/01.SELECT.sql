/*
SELECT 필드명 FROM 테이블명
    JOIN 테이블명
    WHERE 조건
    ORDER BY 필드명 순서
    LIMIT 숫자 OFFSET 숫자
    GROUP BY 필드명
    HAVING 그룹 조건
    ON 조인 조건;
*/
USE world;
SHOW TABLES;
DESC city;
SELECT * FROM city
SELECT * FROM city WHERE countrycode='KOR';   # 필드명에 대소문자 구별은 안함
SELECT NAME, population FROM city WHERE CountryCode='KOR';
SELECT COUNT(*) FROM city;
-- # 호남지역 도시
SELECT * FROM city WHERE district='Kwangju' OR district='Chollabuk' OR district='Chollanam';
-- # 한국의 100만보다 큰 도시중에서 인구수가 짝수인 도시
SELECT * FROM city WHERE countrycode='KOR' AND population>1000000 AND population%2=0;4
-- # 한국의 100만보다 크고 200만보다 작은 도시
SELECT * FROM city WHERE countrycode='KOR' AND population>1000000 AND population<2000000;
-- # 인구수가 1000만 이상인 도시를 인구수의 내림차순으로 조회
SELECT * FROM city WHERE population>8000000 ORDER BY population DESC;  # desc(내림차순) <-> asc(오름차순)
-- # 한국의 도시를 district,name 오름차순
SELECT * FROM city WHERE countrycode='KOR' ORDER BY district, name;
-- # 광역시도별로 도시 인구수가 많은 것부터 보여줘라
-- # 한국의 도시를 district는 오름차순, 인구수는 내림차순
SELECT * FROM city WHERE countrycode='KOR' ORDER BY district, population DESC;


-- # count(*) - 건수
SELECT COUNT(*) FROM city WHERE countrycode='KOR';
-- # 합계
SELECT SUM(population) FROM city WHERE countrycode='KOR';
-- # 평균
SELECT AVG(population) FROM city WHERE countrycode='KOR';
-- #Aliasing(꾸미는?)
SELECT AVG(population) AS average FROM city WHERE countrycode='KOR';
-- # 최대 최소
SELECT max(population), min(population) FROM city WHERE countrycode='KOR';
-- # 광역시도별 인구수
SELECT district, SUM(population) FROM city WHERE countrycode='KOR' GROUP BY district;
-- # 광역시도별 인구수를 내림차순으로
SELECT district, SUM(population) FROM city WHERE countrycode='KOR'
	GROUP BY district ORDER BY SUM(population) desc;
-- # 전라남도의 도시
SELECT GROUP_CONCAT(NAME) FROM city WHERE district='Chollanam';
-- # 한국의 광역시도
SELECT GROUP_CONCAT(DISTINCT district) FROM city WHERE countrycode='KOR';
-- # 광역시도별 도시의 갯수가 많은 순서로
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR'
	GROUP BY district ORDER BY COUNT(*) DESC, district;   
-- # 광역시도별 도시의 갯수가 5개 이상
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR'
	GROUP BY district HAVING COUNT(*)>=5;
-- # 광역시도별 도시의 갯수가 5개 이상을 내림차순으로 정렬
SELECT district, COUNT(*) FROM city WHERE countrycode='KOR'
	GROUP BY district HAVING COUNT(*)>=5 ORDER by COUNT(*) DESC;
-- # 도시의 갯수가 100개 이상인 국가를 도시갯수 내림차순으로 정렬
SELECT countrycode, COUNT(*) FROM city
	GROUP BY countrycode HAVING COUNT(*)>=100 ORDER BY COUNT(*) DESC;
-- # 도시의 갯수가 많은 5개 국가
SELECT countrycode, COUNT(*) FROM city
	GROUP BY countrycode ORDER BY COUNT(*) DESC
	LIMIT 5;
-- # 도시의 인구가 많은 10개 국가
SELECT countrycode, SUM(population) FROM city
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 10;
-- # 도시의 인구가 많은 10개 국가(6위-10위)
SELECT countrycode, SUM(population) FROM city
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 5 OFFSET 5;
-- # 도시의 인구가 많은 국가(6위-10위)
SELECT country.name, SUM(city.population) FROM city
	INNER JOIN country ON city.CountryCode=country.Code
	GROUP BY city.countrycode ORDER BY SUM(city.population) DESC
	LIMIT 5 OFFSET 5;

-- # 대륙별로 국가숫자, GNP의 합, 평균 국가별 GNP는?
SELECT continent, round(SUM(gnp),-3) AS gnpSum, round(AVG(gnp),-3) AS gnpAvg FROM country 
	GROUP BY continent;
-- # 아시아 대륙에서 인구가 가장 많은 도시 10개를 내림차순으로 보여줄 것(대륙명, 국가명, 도시명, 인구수)
SELECT country.Continent, country.Name, city.Name, city.Population FROM city
	JOIN country on city.CountryCode=country.Code
	WHERE country.Continent='Asia'
	ORDER BY city.Population DESC
	LIMIT 10;
-- # 전 세계에서 인구가 가장 많은 10개 도시에서 사용하는 공식언어는?(도시명, 인구수, 언어명)
SELECT c.Name, c.Population, l.`Language` FROM city AS c
	JOIN countrylanguage AS l ON c.CountryCode=l.CountryCode
	WHERE l.IsOfficial='T'
	ORDER BY c.Population desc
	LIMIT 10;

-- # UPDATE
UPDATE city 
	SET NAME='Gwangju', district='Gwangju'
	WHERE id=2336;
	
SELECT * FROM city WHERE NAME='Gwangju';
-- # 전라남도 도시의 인구를 20만으로 변경
UPDATE city
	set population=200000
	WHERE district='chollanam';

SELECT * FROM city WHERE district LIKE 'cholla%';
-- # 전라남도 도시에 해남 추가하기
INSERT INTO city 
	(NAME, countrycode, district, population)
	VALUES ('Haenam', 'KOR', 'Chollanam', 100000);

INSERT INTO city 
	VALUES (DEFAULT, 'Jangsung', 'KOR', 'Chollanam', 100000);
	
SELECT * FROM city WHERE district LIKE 'cholla%';

CREATE TABLE tigers(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	player VARCHAR(10) NOT NULL,
	backNo INT,
	POSITION VARCHAR(10)
);

INSERT INTO tigers
	VALUES (DEFAULT, '양현종', 54, '투수');
INSERT INTO tigers (player, backNo, POSITION)
	VALUES ('이의리', 48, '투수');
INSERT INTO tigers (player, backNo, POSITION)
	VALUES ('박동원', 10, '포수'), VALUES ('김선빈', 3, '내야수'),
	VALUES ('박찬호', 1, '내야수'), VALUES ('나성범', 47, '외야수'), VALUES ('소크라테스', 30, '외야수');
SELECT * FROM tigers;

SHOW TABLES;
DROP TABLE 테이블명;
-- # 테이블 데이터 하나 삭제
DELETE FROM tigers WHERE id=11;
-- # 테이블의 모든 데이터 삭제
TRUNCATE TABLE 테이블명;
-- # 테이블 이름 수정
RENAME TABLE 테이블명 TO 테이블명;
-- # 테이블 데이터값 추가
ALTER TABLE tigers
	ADD isDeleted INT DEFAULT 0;
-- # 테이블 데이터값 수정
ALTER TABLE tigers
	CHANGE `POSITION` `position` VARCHAR(10);


CREATE VIEW largeCity
	as SELECT * FROM city
		WHERE population>=7000000 WITH CHECK OPTION;



CREATE TABLE girl_group (
    gid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    debut DATE NOT NULL,
    hit_song_id INT
) AUTO_INCREMENT=1001;
CREATE TABLE song (
    sid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    lyrics VARCHAR(32)
) AUTO_INCREMENT=101;
INSERT INTO song (title, lyrics)'''
	VALUES ('Tell Me', 'tell me tell me tetetete tel me'),
	('Gee', 'GEE GEE GEE GEE GEE BABY BABY'),
	('미스터', '이름이 뭐야 미스터'),
	('Abracadabra', '이러다 미쳐 내가 여리여리'),
	('8282', 'Give me a call Baby baby'), ('기대해', '기대해'),
	('I Dont care', '다른 여자들의 다리를'),
	('Bad Girl Good Girl', '앞에선 한 마디 말도'), ('피노키오', '뉴예삐오'),
	('별빛달빛', '너는 내 별빛 내 마음의 별빛'),
	('A', 'A 워오우 워오우워 우우우'),
	('나혼자', '나 혼자 밥을 먹고 나 혼자 영화 보고'), ('LUV', '설레이나요 '),
	('짧은치마', '짧은 치마를 입고 내가 길을 걸으면'),
	('위아래', '위 아래 위위 아래'), ('Dumb Dumb', '너 땜에 하루종일');'''
INSERT INTO girl_group (name, debut, hit_song_id)'''
	VALUES ('원더걸스', '2007-02-10', 101),
	('소녀시대', '2007-08-02', 102), ('카라', '2009-07-30', 103),
	('브라운아이드걸스', '2008-01-17', 104), ('다비치', '2009-02-27', 105),
	('2NE1', '2009-07-08', 106), ('f(x)', '2011-04-20', 108),
	('시크릿', '2011-01-06', 109), ('레인보우', '2010-08-12', 110),
	('애프터 스쿨', '2009-11-25', 120), ('포미닛', '2009-08-28', 121);'''

SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics
	FROM song
	JOIN girl_group
	ON song.sid=girl_group.hit_song_id;

-- # 데뷔 일자가 빠른 5개 걸그룹의 히트송(그룹명, 곡명)
SELECT g.name, s.title, g.debut
	FROM song AS s
	JOIN girl_group AS g
	ON s.sid=g.hit_song_id
	ORDER BY g.debut asc LIMIT 5;

# 2009년도에 데뷔한 걸그룹의 히트송은?
SELECT girl_group.name, girl_group.debut, song.title 
	FROM girl_group
	JOIN song
	ON song.sid=girl_group.hit_song_id
	WHERE debut BETWEEN DATE('2009-01-01') AND DATE('2009-12-31')
	ORDER BY girl_group.debut;


-- 날짜/시간 조작

CREATE TABLE dateTable (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dt DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO dateTable VALUES (DEFAULT, DEFAULT);
INSERT INTO dateTable (dt) VALUES
	('2022-08-28 17:22:21'), ('2022-02-15 10:22:24'),
	('2022-12-09 22:13:24'), ('2022-07-06 20:15:18');
SELECT * FROM dateTable;

# 2022-09-23 형식
SELECT DATE_FORMAT(dt, '%Y-%m-%d') FROM dateTable;
# 02:28:00 PM 형식
SELECT DATE_FORMAT(dt, '%r') FROM dateTable;
SELECT DATE_FORMAT(dt, '%h:%i:%s %p') FROM dateTable;
# 22-09-23 14:28 형식
SELECT DATE_FORMAT(dt, '%y-%m-%d %H:%i') FROM dateTable;

SELECT NOW(), CURDATE(), CURTIME();
# 날짜 더하기/빼기
SELECT DATE_ADD(NOW(), INTERVAL 40 DAY);
SELECT DATE_SUB(NOW(), INTERVAL 3 MONTH);
# D-day 계산
SELECT TO_DAYS('2022-11-17') - TO_DAYS(NOW());
# 요일 : 1 - 일요일
SELECT DAYOFWEEK(dt) FROM dateTable;
