 $(function(){
    // 创建棋盘
    for(var i=0;i<224;i++){
        $("li").eq(0).clone(true).appendTo("#divul");
    };
    // 给棋子加hover 效果
      $(".qizi").mouseover(function(){
        if($(this).hasClass("black") || $(this).hasClass("white") ==false ){
          $(this).addClass("over");
        }
      });
      $(".qizi").mouseleave(function(){
        if($(this).hasClass("over")){
          $(this).removeClass("over");
        }
      });
      // isBlack
      var isBlack = true;
      var blackPos = [];
      var whitePos = [];
      $(".qizi").click(function(){
        // black, white => !$(this).hasClass("over") => stop func
        if(!$(this).hasClass("over")){ return;}
        $(this).removeClass("over");
        $(this).addClass(isBlack ? "black" : "white");
        //  index是当前元素的父元素(<li>标签)所在的index;
        var index = $(this).parent().index();
        // X为当前棋子的行数，y为当前棋子所在的列数；
        var position = {x: Math.floor(index/15),y: index%15};
        // isBlack == true => 用blackPos判断胜负
        if(isBlack){
        // blackPos.push(position);
          judgeWinner(position, blackPos);
        }else{
        // isBlack ！== true => 用whitePos判断胜负
        // whitePos.push(position);    
          judgeWinner(position, whitePos);
        }
        function judgeWinner(position, postPosition){
          postPosition.push(position)
          judgeHorizon(position, postPosition);
          judgeVertical(position, postPosition);
          judgeLT2RB(position, postPosition);
          judgeLB2RT(position, postPosition);
        }
        //竖向判断胜负
        function judgeVertical(nowPos, postPosition){
          var newPostPosition = postPosition.map(function(item){
            return {x:item.y, y:item.x}
          })
          var newNowPosition = {x:nowPos.y, y:nowPos.x}
          judgeHorizon(newNowPosition, newPostPosition);        
        }
        //横向判断胜负
        function judgeHorizon(nowPos,postPosition){
          var yLine = postPosition.map(function(item){
            if(item.x == nowPos.x){
              return item.y
            }
          });
          var count = 1;
          var nowY = nowPos.y;
          while(yLine.indexOf(nowY - 1)>-1){
            count++;
            nowY--;
          }
          nowY = nowPos.y;
          while(yLine.indexOf(nowY + 1)>-1){
            count++;
            nowY++;
          }
          if(count>=5){
            goSuccess();
          }
        }
        //斜向(left buttom到right top)判断胜负
        function judgeLB2RT(nowPos, postPosition) {
          var newPostPosition = postPosition.map(function (item) {
             return {x: item.x, y: 14-item.y}
          })
          var newNowPosition = {x: nowPos.x, y:14-nowPos.y}
          judgeLT2RB(newNowPosition, newPostPosition);
        }
        //斜向(left top到right buttom)判断胜负
        function judgeLT2RB(nowPos, postPosition){
          var line = postPosition.filter(function(item){
            return(item.x-nowPos.x ==item.y-nowPos.y);
          });
          console.log(line);
          function inArray(lineArr,point){
            var flag = false;
            for(var i=0; i<lineArr.length; i++){
              if(lineArr[i].x == point.x && lineArr[i].y == point.y){
                flag = true;
              }
            }    
            return flag;
          }        
          var count = 1;
          function judgeLine(nowPos, action){
            var temp = JSON.parse(JSON.stringify(nowPos))
              temp.x = action(temp.x)
              temp.y = action(temp.y)
            while(inArray(line, temp)){
              count++;
              temp.x = action(temp.x) ;
              temp.y = action(temp.y) ;
            }
          }
          judgeLine(nowPos, function(a){ return a-1;})
          judgeLine(nowPos, function(a){ return a+1;})
          if(count>=5){
            goSuccess();
          }
        }
        function goSuccess(){
          if(isBlack){
            alert("黑棋赢!")
          }else{
            alert("白棋赢!")
          }
          $(".qizi").off("click");
        }
        isBlack = !isBlack;
    });
  });