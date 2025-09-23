import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const getNotifications=query({
    handler:async(ctx)=>{
        const currentUser=await getAuthenticatedUser(ctx);

        const notifications=await ctx.db.query("notifications")
        .withIndex("by_receiver",(q)=>q.eq("receiverId",currentUser._id))
        .order("desc")
        .collect();

        const notificationsWithInfo=await Promise.all(
            notifications.map(async(notifications)=>{
                const sender=await ctx.db.get(notifications.senderId);
                let post=null;
                let comment=null;

                if(notifications.postId){
                    post=await ctx.db.get(notifications.postId)
                }

                if(notifications.type==="comment" && notifications.commentId){
                    comment=await ctx.db.get(notifications.commentId);
                }

                return {
                    ...notifications,
                    sender:{
                        _id:sender?._id,
                        username:sender?.username,
                        image:sender?.image,
                    },
                    post,
                    comment:comment?.content,
                }

            })
        )
        return notificationsWithInfo;
    }
})