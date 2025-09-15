import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/feed.styles";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import CommentsModal from "./CommentsModal";

type PostProps={
    post: {
        _id: Id<"posts">;
        imageUrl: string;
        caption?: string;
        likes: number;
        comments: number;
        _creationTime: number;
        isLiked: boolean;
        isBookmarked: boolean;
        author: {
          _id: string;
          username: string;
          image: string;
        };
      };
}

export default function Post({ post }:PostProps) {
  const [isLiked,setIsLiked]=useState(post.isLiked);
  const [likeCount,setLikeCount]=useState(post.likes);
  const [commentsCount,setCommentsCount]=useState(post.comments);
  const [showComments,setShowComments]=useState(false);


   const toggleLike=useMutation(api.posts.toggleLike);

  const handleLike=async()=>{
        try {
         const newIsLiked= await toggleLike({postId:post._id});
         setIsLiked(newIsLiked);
         setLikeCount((prev)=>newIsLiked?prev+1:prev-1)
        } catch (error) {
          console.log("Error toggling like:",error);
        }
  }

  return (
    <View style={styles.post}>
      {/* POST HEADER */}

      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        {/* <TouchableOpacity onPress={()=>{}}>
            <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity> */}

        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* POST IMAGE  */}

      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />

      {/* POST ACTIONS */}

      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons name={isLiked?"heart":"heart-outline"} size={24}  color={isLiked ? COLORS.primary : COLORS.white}
             />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setShowComments(true)}>
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name={"bookmark-outline"} size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>

         {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {likeCount> 0 ? `${likeCount.toLocaleString()} likes` : "Be the first to like"}
        </Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )} 

      
          <TouchableOpacity >
            <Text style={styles.commentsText}>View all 2 comments</Text>
          </TouchableOpacity>

        <Text style={styles.timeAgo}>
         2 hour ago
        </Text>
      </View>

      <CommentsModal
        postId={post._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
        onCommentAdded={()=>setCommentsCount((prev)=>prev+1)}
      />

    </View>
  );
}
