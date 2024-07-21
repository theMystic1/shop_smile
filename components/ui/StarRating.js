import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const containerStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating && onSetRating(rating);
  }

  const textStyle = {
    lineHeight: 1,
    margin: 0,
    color,
    fontSize: size / 1.5,
  };

  return (
    <View style={[containerStyle, className && { className }]}>
      <View style={containerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </View>
    </View>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: size,
    height: size,
    display: "flex",
    cursor: "pointer",
  };

  return (
    <TouchableOpacity
      style={starStyle}
      onPress={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <Ionicons name="star" size={size} color={color} />
      ) : (
        <Ionicons name="star-outline" size={size} color={color} />
      )}
    </TouchableOpacity>
  );
}
