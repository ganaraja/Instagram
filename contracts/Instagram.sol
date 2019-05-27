pragma solidity ^0.4.25;

contract Instagram {
    struct Post {
        address user;
        string  img_title;
        string  img_url;
        uint256 likecount;
        mapping(address => bool) likes;
    }
    
    Post[] public posts;
    
    event ImgLog(uint256 indexed index, string img_title, string img_url);
    
    function send_image_details(string memory title, string memory url) public payable {
        uint count;
        Post memory post = Post({
            user: msg.sender,
            img_title: title,
            img_url: url,
            likecount: 0
        }); 
        count = posts.length;
        posts.push(post);
        emit ImgLog(count, title, url);
    }
    
    function like_post(uint id) public payable {
        require(msg.sender != posts[id].user);  // owner cannot like his own image
        require(!posts[id].likes[msg.sender]);  //if the user has already liked 
       
        posts[id].likes[msg.sender] = true;
        posts[id].likecount += 1;
        
    }
    
    
}