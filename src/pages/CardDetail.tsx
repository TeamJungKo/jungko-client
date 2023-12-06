import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetailComponent from '../components/common/CardDetailComponent.tsx';
import { Product, Card } from '../types/types.ts';
import {
  getMyCard,
  getMyProfile,
  getInterestedCard
} from '../api/axios.custom.ts';

const CardDetail: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [myCards, setMyCards] = useState<Card[]>([]);
  const [interestedCards, setInterestedCards] = useState<Card[]>([]);
  const [cardStatus, setCardStatus] = useState<
    'myCard' | 'interestedCard' | 'otherCard'
  >('otherCard');
  const [myProfileId, setMyProfileId] = useState<number | null>(null);
  const params = useParams<{ cardId: string }>();
  const currentCardId = Number(params.cardId);
  const handleRemoveProduct = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((p) => p.productId !== product.productId)
    );
  };

  useEffect(() => {
    const fetchMyProfileId = async () => {
      try {
        const response = await getMyProfile();
        setMyProfileId(response.data.memberId);
      } catch (error) {
        console.error('Error fetching my profile', error);
      }
    };

    fetchMyProfileId();
  }, []);

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const response = await getMyCard(0, 100);
        setMyCards(response.data.cards);
      } catch (error) {
        console.error('Error fetching my cards', error);
      }
    };

    fetchMyCards();
  }, []);

  useEffect(() => {
    if (myProfileId != null) {
      const fetchInterestedCards = async () => {
        try {
          const response = await getInterestedCard(myProfileId, 0, 100);
          setInterestedCards(response.data.cards);
        } catch (error) {
          console.error('Error fetching interested cards', error);
        }
      };

      fetchInterestedCards();
    }
  }, [myProfileId]);

  useEffect(() => {
    let status: 'myCard' | 'interestedCard' | 'otherCard' = 'otherCard';

    if (myCards.some((card) => card.cardId === currentCardId)) {
      status = 'myCard';
    } else if (interestedCards.some((card) => card.cardId === currentCardId)) {
      status = 'interestedCard';
    }

    setCardStatus(status);
  }, [myCards, interestedCards, currentCardId]);

  const handleCheck = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.find((p) => p.productId === product.productId)
        ? prevSelected.filter((p) => p.productId !== product.productId)
        : [...prevSelected, product]
    );
  };

  return (
    <CardDetailComponent
      cardStatus={cardStatus}
      cardId={currentCardId}
      selectedProducts={selectedProducts}
      onCheck={handleCheck}
      setSelectedProducts={setSelectedProducts}
      onRemoveProduct={handleRemoveProduct}
    />
  );
};

export default CardDetail;
