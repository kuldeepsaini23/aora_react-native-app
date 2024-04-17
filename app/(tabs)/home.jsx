import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import { StatusBar } from "expo-status-bar";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { data:posts, isLoading, refetch} = useAppwrite(getAllPosts); 

  const { data:latestPosts} = useAppwrite(getLatestPosts); 


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    //re call videos  -> if any new video appeared
    await refetch();
    setRefreshing(false);
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(post) => post.$id}
        renderItem={({ item }) => (
         <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              {/* Text */}
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-pmedium text-2xl text-white">
                  Kuldeep Saini
                </Text>
              </View>
              {/* Image */}
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            {/* Search */}
            <SearchInput placeholder="Search for a video topic" />
            {/* Trending Section */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Home;
