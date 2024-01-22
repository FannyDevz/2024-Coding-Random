//https://www.codewars.com/kata/5868b2de442e3fb2bb000119/train/javascript

function  closest(strng) {
    //   Example DATA: strng = "55 44 33 22 11"
    
    
    //   -------------------- DATA CONVERTIONS ---------------------
    
      let strngNumbers = strng.split(' ')
      //   It returns: ['55', '44', '33', '22'. '11']
    
    
      let numbers = strngNumbers.map(n=> parseInt(n) )
      //   It returns: [55, 44, 33, 22. 11]
    
    
      let dividedNumbers = strngNumbers.map(n=>n.split('').map(d=>parseInt(d)))  
      //   It returns: [[5,5], [4,4], [3,3], [2,2]. [1,1]]
    
    
      let weigths = dividedNumbers.map(n=>n.reduce((acc,el)=> acc+=el , 0))
      //   It returns: [10, 8, 6, 4, 2]
    
    
      let orderedWeigths = weigths.slice().sort((a, b) => a - b);
      //   It returns: [2, 4, 6, 8, 10]
    
    
      let weigthDifference = [];
          for(let i=0; i < orderedWeigths.length - 1; i++){
            let dif = orderedWeigths[i+1] - orderedWeigths[i] 
              weigthDifference.push(dif)  
          }
      //   It returns: [4-2, 6-4, 8-6, , 10-8]
      //   That is equal to: [2, 2, 2, 2, 2]
    
    
    //    -------------------- RESULT DATA ---------------------
      let smallestDifferenceIndex = weigthDifference.indexOf(Math.min(...weigthDifference))
      //   It returns: 0
    
    
      let smallestWeigths = [orderedWeigths[smallestDifferenceIndex], orderedWeigths[smallestDifferenceIndex + 1]]
      //   It returns: [2, 4]
    
    
      let smallestWeigthIndex
    
          if(smallestWeigths[0] == smallestWeigths[1])
            {
              smallestWeigthIndex =  
                [
                  weigths.indexOf(smallestWeigths[0]), 
                  weigths.indexOf(smallestWeigths[1], weigths.indexOf(smallestWeigths[0]) + 1)
                ]
            }
    
          else
            {
              smallestWeigthIndex = [ weigths.indexOf(smallestWeigths[0]), weigths.indexOf(smallestWeigths[1])]
            }
      //   It returns: [0,1]
    
    
      let originalNumber = [numbers[smallestWeigthIndex[0]], numbers[smallestWeigthIndex[1]]]
      //   It returns: [55,44]
    
    
    //   -----------------------------------------  GETTING THE RESULT
      let result = [
        [
          smallestWeigths[0],
          smallestWeigthIndex[0],
          originalNumber[0]
        ],
    
        [
          smallestWeigths[1],
          smallestWeigthIndex[1],
          originalNumber[1]
        ]
      ]
      //   It returns: [[2,0,2], [4,1,4]]
    
    
        if(strng == ""){
          return []
        }else{
          return result
        }
    }