const icsString = "BEGIN:VCALENDAR\nMETHOD:PUBLISH\nVERSION:2.0\nX-WR-CALNAME:课程表\nPRODID:-//Apple Inc.//Mac OS X 10.14//EN\nX-APPLE-CALENDAR-COLOR:#FC4208\nX-WR-TIMEZONE:Asia/Shanghai\nCALSCALE:GREGORIAN\nBEGIN:VTIMEZONE\nTZID:Asia/Shanghai\nLAST-MODIFIED:20201011T015912Z\nX-LIC-LOCATION:Asia/Shanghai\nX-PROLEPTIC-TZNAME:LMT\nBEGIN:STANDARD\nTZNAME:CST\nTZOFFSETFROM:+080543\nTZOFFSETTO:+0800\nDTSTART:19010101T000000\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:CDT\nTZOFFSETFROM:+0800\nTZOFFSETTO:+0900\nDTSTART:19190413T000000\nRDATE:19400601T000000\nRDATE:19410315T000000\nRDATE:19420131T000000\nRDATE:19460515T000000\nRDATE:19470415T000000\nRDATE:19860504T020000\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:CST\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0800\nDTSTART:19191001T000000\nRDATE:19401013T000000\nRDATE:19411102T000000\nRDATE:19450902T000000\nRDATE:19461001T000000\nRDATE:19471101T000000\nRDATE:19481001T000000\nRDATE:19490528T000000\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:CDT\nTZOFFSETFROM:+0800\nTZOFFSETTO:+0900\nDTSTART:19480501T000000\nRRULE:FREQ=YEARLY;UNTIL=19490430T160000Z\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:CST\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0800\nDTSTART:19860914T020000\nRRULE:FREQ=YEARLY;BYMONTH=9;BYMONTHDAY=11,12,13,14,15,16,17;BYDAY=SU;UNTIL=19910914T170000Z\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:CDT\nTZOFFSETFROM:+0800\nTZOFFSETTO:+0900\nDTSTART:19870412T020000\nRRULE:FREQ=YEARLY;BYMONTH=4;BYMONTHDAY=11,12,13,14,15,16,17;BYDAY=SU;UNTIL=19910413T180000Z\nEND:DAYLIGHT\nEND:VTIMEZONE\n"
const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const uppperLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// const startDate=new Date('2021-09-06')
import classTime from '../assets/conf_classTime.json'
export  function Parser(sheets,startDate) {
    // 有效区域 B4:H8
    console.log(sheets)
    let Events=[]
    let shortEvents=[]
    for (let  index1  = 1; index1 < 8; index1++){
        for (let  index2  = 4; index2 < 9; index2++){
            let content=sheets[uppperLetter.charAt(index1)+index2]?sheets[uppperLetter.charAt(index1)+index2].v:undefined
            // console.log(content)
            // console.log(uppperLetter.charAt(index1)+index2)
            if(content==undefined) continue
            let lines=content.split('\n')
            // if(lines.length>7){
                for(let i=0; i<lines.length-1;i=i+6){
                    let event={
                        name:lines[i+1],
                        teacher:lines[i+2],
                        date:lines[i+3],
                        time:lines[i+4],
                        position:lines[i+5],
                        timed:true
                    }
                    let dateArrs=getDate(event,index1)
                    let dateArr=dateArrs[0]
                    let shortDateArr=dateArrs[1]
                    let time=getTime(event,index2)
                    dateArr.forEach(v=>{
                        let temp={...event}
                        let start=new Date(startDate)
                        start.setDate(start.getDate()+v)
                        start.setHours(time['startTime']['hours'],time['startTime']['minutes'])

                        temp['start']=start.getTime()
                        let end=new Date(startDate)
                        end.setDate(end.getDate()+v)
                        end.setHours(time['endTime']['hours'],time['endTime']['minutes'])

                        temp['end']=end.getTime()
                        Events.push(temp)

                    })
                    shortDateArr.forEach(v=>{
                        let temp={...v}
                        let start=new Date(startDate)
                        start.setDate(start.getDate()+v['dateStart'])
                        start.setHours(time['startTime']['hours'],time['startTime']['minutes'])

                        temp['start']=start.getTime()
                        let end=new Date(startDate)
                        end.setDate(end.getDate()+v['dateStart'])
                        end.setHours(time['endTime']['hours'],time['endTime']['minutes'])

                        temp['end']=end.getTime()
                        shortEvents.push(temp)

                    })
                }

            // }else {
            // Just Prototype
            //     let event={
            //         name:lines[1],
            //         teacher:lines[2],
            //         date:lines[3],
            //         time:lines[4],
            //         position:lines[5],
            //     }
            //     let dateArr=getDate(event,index1)
            //     let time=getTime(event,index2)
            //     dateArr.forEach(v=>{
            //         let start=new Date(startDate)
            //         start.setDate(start.getDate()+v)
            //         start.setHours(time['startTime']['hours'],time['startTime']['minutes'])
            //
            //         event['start']=start
            //         let end=new Date(startDate)
            //         end.setDate(end.getDate()+v)
            //         end.setHours(time['endTime']['hours'],time['endTime']['minutes'])
            //
            //         event['end']=end
            //
            //     })
            //
            // }



        }
    }


console.log(Events)
    console.log(shortEvents)
    return [Events,shortEvents]

}
function iCSDateFormatter(date){
    // return `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}T${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}${date.getSeconds().toString().padStart(2,'0')}`
    return date.getFullYear()+(date.getMonth()+1).toString().padStart(2,'0')+date.getDate().toString().padStart(2,'0')+'T'+date.getHours().toString().padStart(2,'0')+date.getMinutes().toString().padStart(2,'0')+date.getSeconds().toString().padStart(2,'0')
}
function randomString(length) {
    var result = '';
    for (var i = length; i > 0; --i) result += letterBytes[Math.floor(Math.random() * letterBytes.length)];
    return result;
}
function icsGenUUID() {
    return randomString(20)+"&UPC.edu"

}
// eslint-disable-next-line no-unused-vars
export function iCSExport(events,reminder){
let icsEvents = []
    for(let event of events){
        let baseString= "BEGIN:VEVENT\nCREATED:"+iCSDateFormatter(new Date())+"Z\nUID:"+icsGenUUID()+"\nDTEND;TZID=Asia/Shanghai:"+iCSDateFormatter(new Date(event['end']))+"\nTRANSP:OPAQUE\nX-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\n" +
            "SUMMARY:"+event['name']+"\nDESCRIPTION:"+event['teacher']+"\nLOCATION:"+event['position']+"\nDTSTART;TZID=Asia/Shanghai:"+iCSDateFormatter(new Date(event['start']))+"\nDTSTAMP:"+iCSDateFormatter(new Date())+"Z\n"
        if (event['repeat']!=0){
            baseString+="RRULE:FREQ=WEEKLY;COUNT="+event['repeat']+"\n"
        }
        if(reminder!=""){
            baseString+="BEGIN:VALARM\n" +
                "X-WR-ALARMUID:"+icsGenUUID()+"\n" +
                "UID:"+icsGenUUID()+"\n" +
                "TRIGGER:"+reminder+"\n" +
                "DESCRIPTION:"+event['name']+"@"+event['position']+"\n" +
                "ACTION:DISPLAY\n" +
                "END:VALARM\n"
        }
        baseString+="END:VEVENT\n"
        icsEvents.push(baseString)

    }
    let content=icsString
    content+=icsEvents.join("")
    content+="END:VCALENDAR\n"
    return content


}
function getDate(event,index1){

    let dateArr=[ ]
    let shortDateArr=[ ]
    let date=event['date'].replace("(周)","")
    if(date.indexOf(",")!==-1){
        let datestr=date.split(",")
        datestr.forEach(v=>{
            if(v.indexOf("-")!==-1){
                let vi=v.split("-")
                let wStart=Number(vi[0])
                let wEnd=Number(vi[1])
                for(let i =wStart;i<=wEnd;i++){
                    dateArr.push((i-1)*7+index1-1)


                }
            shortDateArr.push(
                {...event,dateStart:(wStart-1)*7+index1-1,repeat:wEnd-wStart+1}
            )

            }else{
             dateArr.push((Number(v)-1)*7+index1-1)
                shortDateArr.push(
                    {...event,dateStart:(Number(v)-1)*7+index1-1,repeat:0}
                )
            }
        })



    }else if (date.indexOf("-")!=-1){
        let vi=date.split("-")
        let wStart=Number(vi[0])
        let wEnd=Number(vi[1])
        for(let i =wStart;i<=wEnd;i++){
            dateArr.push((i-1)*7+index1-1)
        }
        shortDateArr.push(
            {...event,dateStart:(wStart-1)*7+index1-1,repeat:wEnd-wStart+1}
        )
    }else {
        dateArr.push((Number(date)-1)*7+index1-1)
        shortDateArr.push(
            {...event,dateStart:(Number(date)-1)*7+index1-1,repeat:0}
        )
    }
    console.log(dateArr)
return [dateArr,shortDateArr]
}

function getTime(event,index2){
    let time=classTime[index2-4]

    //特殊节次处理
    if (event['time'].indexOf("03-04-05")!=-1){
        time=classTime[7]
    }
    if (event['time'].indexOf("10-11-12")!=-1){
        time=classTime[8]
    }
    let timeStruct={
        name: time['name'],
        startTime: {
            hours:Number(time['startTime'].slice(0,2)),
            minutes:Number(time['startTime'].slice(2))
        },
        endTime: {
            hours:Number(time['endTime'].slice(0,2)),
            minutes:Number(time['endTime'].slice(2))
        },
    }
    console.log(timeStruct)

    return timeStruct
}