WITH RecursiveSubdivisions AS (
    -- Начинаем с подразделения сотрудника "Сотрудник 1"
    SELECT id, name, parent_id, 0 AS sub_level
    FROM subdivisions
    WHERE id = (SELECT subdivision_id FROM collaborators WHERE id = 710253)
    
    UNION ALL
    
    -- Рекурсивно получаем все нижестоящие подразделения
    SELECT s.id, s.name, s.parent_id, rs.sub_level + 1
    FROM subdivisions s
    JOIN RecursiveSubdivisions rs ON s.parent_id = rs.id
    WHERE s.id NOT IN (100055, 100059)
),
FilteredCollaborators AS (
    -- Получаем сотрудников младше 40 лет из найденных подразделений
    SELECT c.id, c.name, c.subdivision_id, rs.sub_level, rs.name AS sub_name
    FROM collaborators c
    JOIN RecursiveSubdivisions rs ON c.subdivision_id = rs.id
    WHERE c.age < 40
),
CollaboratorCounts AS (
    -- Считаем количество сотрудников в каждом подразделении
    SELECT subdivision_id, COUNT(*) AS colls_count
    FROM collaborators
    GROUP BY subdivision_id
)
-- Формируем финальный результат
SELECT fc.id, 
       fc.name, 
       fc.sub_name, 
       fc.subdivision_id AS sub_id, 
       fc.sub_level, 
       cc.colls_count
FROM FilteredCollaborators fc
JOIN CollaboratorCounts cc ON fc.subdivision_id = cc.subdivision_id
ORDER BY fc.sub_level;
