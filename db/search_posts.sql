select * from postings
LEFT JOIN users on postings.user_id = users.user_id
where UPPER(postings.post_title) like UPPER($1)