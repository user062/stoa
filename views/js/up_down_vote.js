function chose_vote(post_id, response_id, user_choice, previous_choice) {
    if (user_choice === previous_choice)
        return;

    let choices = { '-1': 'downvote', 1: 'upvote' };

    let f = document.createElement("form");
    f.setAttribute('name', 'f');
    f.setAttribute('id', 'f');
    f.setAttribute('method', "post");
    f.setAttribute('action', "reply_vote/reply_vote");

    let choice = document.createElement("input");
    choice.setAttribute('type', "hidden");
    choice.setAttribute('name', "choice");
    choice.setAttribute('value', user_choice);
    f.appendChild(choice);

    let post = document.createElement("input");
    post.setAttribute('type', "hidden");
    post.setAttribute('name', "post_id");
    post.setAttribute('value', post_id);
    f.appendChild(post);

    let response = document.createElement("input");
    response.setAttribute('type', "hidden");
    response.setAttribute('name', "reply_id");
    response.setAttribute('value', response_id);
    f.appendChild(response);

    let s = document.createElement("button");
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Submit");
    s.hidden = true;
    f.appendChild(s);
    document.body.append(f);
    f.submit();
}

function show_vote_all() {
    let votes = document.getElementsByClassName("vote-answer");
    let choices = { '-1': 'downvote', 1: 'upvote' };

    for (const vote of votes)
        if (vote.id !== "false") {
            vote.getElementsByClassName(choices[vote.id])[0].classList.add("selected_vote");
        }
}

show_vote_all();
