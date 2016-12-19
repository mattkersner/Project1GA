![Game Image](http://i.imgur.com/7Yv3JuM.png)

# Yea, I want CheesyPoofs! An Eric Cartman Adventure
This is a twist on a classic "catch em all" game, using a couple of my favorite cartoon characters. Move Cartman around using the right and left arrow keys and try and catch all of the falling cheesy poofs. Each cheesy poof is worth 5 points. Level one is up to 25 points. Be on the lookout for a special appearance that's worth extra points!

I've been watching South Park since I was 13 years old. The show has evolved from a silly comedy into hilarious and cutting social commentary. The shows creators, Trey Parker and Matt Stone, are people I regard as geniuses. This is an homage.

Find the easter eggs and play as different characters!

###[Play the Game](http://actuary-frog-62264.bitballoon.com/) 


##Technologies Used
- HTML
- CSS
- Javascript Classes
- Jquery

```Javascript
// collission detection
  checkForCollision(cheesyPoofs, cartman) {
  // define full dimensions of cheesypoofs
    this.x1 = $(cheesyPoofs).offset().left;
    this.y1 = $(cheesyPoofs).offset().top;
    this.cheesyWidth = $(cheesyPoofs).outerWidth(true);
    this.cheesyHeight = $(cheesyPoofs).outerHeight(true);
    this.entirePoofWidth = this.x1 + this.cheesyWidth;
    this.entirePoofHeight = this.y1 + this.cheesyHeight;
  // define full dimensions of cartman
    this.x2 = $(cartman).offset().left;
    this.y2 = $(cartman).offset().top;
    this.cartmanWidth = $(cartman).outerWidth(true);
    this.cartmanHeight = $(cartman).outerHeight(true);
    this.entireCartmanWidth = this.x2 + this.cartmanWidth;
    this.entireCartmanHeight = this.y2 + this.cartmanHeight;
  // all measurements of when cartman and cheesypoofs are not colliding, return false
    if (this.entirePoofHeight < this.y2 || this.y1 > this.entireCartmanHeight || this.entirePoofWidth < this.x2 || this.x1 > this.entireCartmanWidth) {
      return false;
    } else {
      console.log("COLLISION!")
      return true;
    }
  };
```

###Build Strategy
I started simple and built the gameboard and falling objects first. Then I created a div and added the keyboard functionality to it. Then I figured out the collision logic (which had me scratching my head for a long time). Once I had those things down, it was just a matter of adding the bells and whistles and making it my own. 

###Complications/Future Improvements
I would like to add additional levels. Right now there's only one. Also, I need to correct the timer. I have it working well, but couldn't get it synced with the start button click event the way I wanted, so I would like to fix that. Have plenty of ideas for this game in the future and I hope to build on it extensively. 

####Authors
Matt Kersner
