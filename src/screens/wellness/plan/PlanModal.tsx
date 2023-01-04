import React from 'react';
import { Text, View } from 'react-native';
import CreatePlanIcon from 'src/assets/svg/createPlan.svg';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomModal from 'src/components/CustomModal';
import styles from './Plan.style';

type Props = {
    onClose?: () => void;
    show: boolean;
    heading?: string;
    description?: string;
    description2?: string;
};

const PlanModal = ({
    onClose,
    show,
    description,
    heading,
    description2,
}: Props) => {
    return (
        <CustomModal
            childrenStyle={{ justifyContent: 'center' }}
            // childrenViewStyle={{ flex: 0.4 }}
            onClose={onClose}
            isOpen={show}
            icon={<CreatePlanIcon />}
            iconViewStyle={{ marginTop: -35, borderRadius: 200 }}
        >
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.description}>{description}</Text>
                {description2 && (
                    <Text style={styles.description}>{description2}</Text>
                )}
            </View>
            <View
                style={{
                    alignSelf: 'center',
                    marginBottom: -30,
                    paddingTop: 40,
                }}
            >
                <CustomButton onPress={onClose} arrow />
            </View>
        </CustomModal>
    );
};

export default PlanModal;
